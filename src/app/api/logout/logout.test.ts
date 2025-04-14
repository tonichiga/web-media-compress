import axios from "axios";
import { GET } from "./route";

jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("GET /api/logout", () => {
  it("Должен удалить текуны из cookie", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      status: 200,
    });

    const res = await GET();

    expect(res.status).toBe(200);
    expect(res.headers.get("Set-Cookie")).toContain(
      "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    expect(res.headers.get("Set-Cookie")).toContain(
      "refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
  });
});
