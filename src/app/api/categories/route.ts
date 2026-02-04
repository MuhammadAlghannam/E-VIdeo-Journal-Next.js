import { NextResponse } from "next/server";

export async function GET() {
  // response
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: CategoriesResponse = await response.json();

  return NextResponse.json(payload, { status: response.status });
}