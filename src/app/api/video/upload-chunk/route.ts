import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  // Forward multipart body as-is
  const formData = await request.formData();

  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  // Laravel returns JSON for both chunk ack and final assembled path
  const text = await response.text();
  const contentType = response.headers.get("content-type") || "application/json";
  return new NextResponse(text, {
    status: response.status,
    headers: {
      "content-type": contentType,
    },
  });
}


