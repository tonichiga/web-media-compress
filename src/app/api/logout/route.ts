import { logger } from "@/07.shared/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await axios.post("/auth/logout");
  } catch (error: unknown) {
    logger("Logout error", error);
  }
  const res = new NextResponse(
    JSON.stringify({
      logout: "success",
    }),
    {
      status: 200,
    }
  );
  res.cookies.delete("token");
  res.cookies.delete("refreshToken");

  return res;
}
