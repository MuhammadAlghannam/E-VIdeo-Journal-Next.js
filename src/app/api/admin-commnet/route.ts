import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mediaId = url.searchParams.get("media_id");

  const response = await fetch(
    `${process.env.BASE_URL}/i-hide-the-real-end-point?media_id=${mediaId ?? ""}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const payload: GetAdminCommentsResponse = await response.json();

  return NextResponse.json(payload, { status: response.status });
}