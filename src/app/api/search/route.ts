import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();

  const { searchParams } = new URL(req.url);
  const word = searchParams.get("search") ?? "";

  const response = await fetch(
    `${process.env.BASE_URL}/i-hide-the-real-end-point=${encodeURIComponent(word)}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
        Accept: "application/json",
      },
    },
  );

  const payload: VideoSearchResponse = await response.json();

  return NextResponse.json(payload, { status: response.status });
}
