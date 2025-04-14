import { privateBaseQuery } from "./interceptors";
import { baseQuery } from "./base-rtk-api";
import { axiosForNextApi } from "../axios";

jest.mock("./base-rtk-api", () => ({
  baseQuery: jest.fn(),
}));

jest.mock("../axios", () => ({
  // Мокаем наш инстанс
  axiosForNextApi: {
    get: jest.fn(),
  },
}));

describe("privateBaseQuery", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("должен повторить запрос с новым токеном при 401", async () => {
    (baseQuery as jest.Mock)
      .mockResolvedValueOnce({ error: { status: 401 } }) // Первый запрос возвращает 401
      .mockResolvedValueOnce({ data: "new-token" }); // Повторный запрос успешен

    (axiosForNextApi.get as jest.Mock).mockResolvedValueOnce({
      data: "new-token",
    });

    const api = {
      dispatch: jest.fn(),
    };

    const result = await privateBaseQuery("test-args", api as any, {});

    expect(baseQuery).toHaveBeenCalledTimes(2);
    expect(axiosForNextApi.get).toHaveBeenCalledWith("/api/refresh");
    expect(result).toEqual({ data: "new-token" });
  });

  it("должен разлогинить пользователя, если токен не обновился", async () => {
    (baseQuery as jest.Mock).mockResolvedValueOnce({ error: { status: 401 } });

    (axiosForNextApi.get as jest.Mock).mockResolvedValueOnce(null); // Симулируем неудачное обновление токена

    const api = {
      dispatch: jest.fn(),
    };

    axiosForNextApi.get = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ logout: "success" }),
    });

    const result = await privateBaseQuery("test-args", api as any, {});

    expect(baseQuery).toHaveBeenCalledTimes(1); // baseQuery вызывается только один раз
    expect(axiosForNextApi.get).toHaveBeenCalledWith("/api/refresh");
    expect(axiosForNextApi.get).toHaveBeenCalledWith("/api/logout");
    expect(result).toEqual({ error: { status: 401 } });
  });
});
