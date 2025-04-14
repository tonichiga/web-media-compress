import { NextRequest } from "next/server";
import { POST } from "./route";
import { axiosForPublic } from "@/07.shared/lib/axios";

jest.mock("@/07.shared/lib/axios", () => ({
  axiosForPublic: {
    post: jest.fn(),
  },
}));

describe("POST /api/refresh", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("должен вернуть токен и установить cookie при успешном обновлении", async () => {
    const mockToken = "new-token";
    const mockTokenExpires = 3600;

    (axiosForPublic.post as jest.Mock).mockResolvedValueOnce({
      data: { token: mockToken, tokenExpires: mockTokenExpires },
      status: 200,
    });

    const req = {
      headers: { "x-real-ip": "127.0.0.1" },
      json: async () => ({ hash: "test-hash" }),
    } as unknown as NextRequest;

    const res = await POST(req);
    const expiresDate = new Date(
      Date.now() + mockTokenExpires * 1000
    ).toUTCString();

    expect(axiosForPublic.post).toHaveBeenCalledWith(
      "/auth/refresh",
      { hash: "test-hash" },
      {
        headers: {
          "x-client-real-ip": "127.0.0.1",
        },
      }
    );

    expect(res.status).toBe(200);

    expect(res.headers.get("Set-Cookie")).toEqual(
      expect.stringContaining(
        `token=${mockToken}; Path=/; Expires=${expiresDate}; SameSite=strict`
      )
    );
  });

  it("должен вернуть 500 при ошибке внешнего API", async () => {
    (axiosForPublic.post as jest.Mock).mockRejectedValueOnce(
      new Error("API error")
    );

    const req = {
      headers: { "x-real-ip": "127.0.0.1" },
      json: async () => ({ hash: "test-hash" }),
    } as unknown as NextRequest;

    const res = await POST(req);

    expect(res.status).toBe(500);
    expect(res.statusText).toBe("Internal Next Error");
  });
});
