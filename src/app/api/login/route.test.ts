import { axiosForPublic } from "@/07.shared/lib/axios";
import { POST } from "./route";
import { NextRequest } from "next/server";

jest.mock("@/07.shared/lib/axios", () => ({
  axiosForPublic: {
    post: jest.fn(),
  },
}));

describe("POST /api/login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Должен вернуть 200 и установить токены с длительностью из API, если rememberMe = true", async () => {
    (axiosForPublic.post as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: {
        token: "test-token",
        refreshToken: "test-refresh-token",
        tokenExpires: 3600, // 1 час в секундах
      },
    });

    const req = {
      headers: { "x-real-ip": "127.0.0.1" },
      json: async () => ({
        email: "test@gmail.com",
        password: "123456",
        rememberMe: true,
      }),
    } as unknown as NextRequest;

    const res = await POST(req);

    const expiresDate = new Date(Date.now() + 3600 * 1000).toUTCString();

    expect(axiosForPublic.post).toHaveBeenCalledWith(
      "/auth/login",
      { email: "test@gmail.com", password: "123456" },
      { headers: { "x-client-real-ip": "127.0.0.1" } }
    );

    expect(res.status).toBe(200);

    expect(res.headers.get("Set-Cookie")).toEqual(
      expect.stringContaining(
        `token=test-token; Path=/; Expires=${expiresDate}; SameSite=strict, refreshToken=test-refresh-token; Path=/; Expires=${expiresDate}; HttpOnly; SameSite=strict`
      )
    );
  });

  it("Должен вернуть 200 и установить токены на 1 день, если rememberMe = false", async () => {
    (axiosForPublic.post as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: {
        token: "test-token",
        refreshToken: "test-refresh-token",
        tokenExpires: 3600, // Игнорируется, так как rememberMe = false
      },
    });

    const req = {
      headers: { "x-real-ip": "127.0.0.1" },
      json: async () => ({
        email: "test@gmail.com",
        password: "123456",
        rememberMe: false,
      }),
    } as unknown as NextRequest;

    const res = await POST(req);

    expect(axiosForPublic.post).toHaveBeenCalledWith(
      "/auth/login",
      { email: "test@gmail.com", password: "123456" },
      { headers: { "x-client-real-ip": "127.0.0.1" } }
    );

    expect(res.status).toBe(200);

    const expiresDate = new Date(Date.now() + 86400 * 1000).toUTCString();

    expect(res.headers.get("Set-Cookie")).toEqual(
      expect.stringContaining(
        `token=test-token; Path=/; Expires=${expiresDate}; SameSite=strict, refreshToken=test-refresh-token; Path=/; Expires=${expiresDate}; HttpOnly; SameSite=strict`
      )
    );
  });

  it("Должен вернуть 200 и установить токены на 1 день, если rememberMe не указан", async () => {
    (axiosForPublic.post as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: {
        token: "test-token",
        refreshToken: "test-refresh-token",
        tokenExpires: 3600, // Игнорируется, так как rememberMe не указан
      },
    });

    const req = {
      headers: { "x-real-ip": "127.0.0.1" },
      json: async () => ({
        email: "test@gmail.com",
        password: "123456",
      }),
    } as unknown as NextRequest;

    const res = await POST(req);

    expect(axiosForPublic.post).toHaveBeenCalledWith(
      "/auth/login",
      { email: "test@gmail.com", password: "123456" },
      { headers: { "x-client-real-ip": "127.0.0.1" } }
    );

    expect(res.status).toBe(200);

    // Динамически вычисляем дату Expires
    const expiresDate = new Date(Date.now() + 86400 * 1000).toUTCString();

    expect(res.headers.get("Set-Cookie")).toEqual(
      expect.stringContaining(
        `token=test-token; Path=/; Expires=${expiresDate}; SameSite=strict, refreshToken=test-refresh-token; Path=/; Expires=${expiresDate}; HttpOnly; SameSite=strict`
      )
    );
  });
});
