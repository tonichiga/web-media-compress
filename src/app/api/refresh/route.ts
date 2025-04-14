import { axiosForPublic } from "@/07.shared/lib/axios";
import { NextRequest } from "next/server";

interface ILoginResponse {
  token: string;
  tokenExpires: number;
}

export async function POST(req: NextRequest) {
  const clientIP = req.headers["x-real-ip"];
  const { hash } = await req.json();

  try {
    const response = await axiosForPublic.post(
      "/auth/refresh",
      { hash },
      {
        headers: {
          "x-client-real-ip": clientIP,
        },
      }
    );

    const data = response.data as ILoginResponse;

    const res = new Response(JSON.stringify(response.data), {
      status: response.status,
    });

    const expiresDate = new Date(
      Date.now() + data.tokenExpires * 1000
    ).toUTCString();

    res.headers.set(
      "Set-Cookie",
      `token=${data.token}; Path=/; Expires=${expiresDate}; SameSite=strict`
    );

    return res;
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: "Internal Next Error",
    });
  }
}
