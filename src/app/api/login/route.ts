import { axiosForPublic } from "@/07.shared/lib/axios";
import { logger } from "@/07.shared/utils";
import { NextRequest, NextResponse } from "next/server";

interface ILoginResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
}

export async function POST(req: NextRequest) {
  const clientIP = req.headers["x-real-ip"];
  const { email, password, rememberMe } = await req.json();

  try {
    const response = await axiosForPublic.post(
      "/auth/login",
      { email, password },
      {
        headers: {
          "x-client-real-ip": clientIP,
        },
      }
    );

    const data = response.data as ILoginResponse;

    const res = new NextResponse(JSON.stringify(response.data), {
      status: response.status,
    });

    const tokenExpires = Math.floor(data.tokenExpires);
    const day = 60 * 60 * 24;

    res.cookies.set("token", data.token, {
      path: "/",
      sameSite: "strict",
      expires: new Date(Date.now() + (rememberMe ? tokenExpires : day) * 1000),
    });

    res.cookies.set("refreshToken", data.refreshToken, {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      expires: new Date(Date.now() + (rememberMe ? tokenExpires : day) * 1000),
    });

    return res;
  } catch (error) {
    logger("Hash validate error", error);
    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: "Internal Next Error",
    });
  }
}
