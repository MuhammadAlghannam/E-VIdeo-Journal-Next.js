import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mediaId = url.searchParams.get("media_id");
  const userId = url.searchParams.get("user_id");

  const response = await fetch(
    `${process.env.BASE_URL}/i-hide-the-real-end-point=${mediaId ?? ""}&user_id=${userId ?? ""}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const payload: GetCommentsResponse = await response.json();

  return NextResponse.json(payload, { status: response.status });
}
