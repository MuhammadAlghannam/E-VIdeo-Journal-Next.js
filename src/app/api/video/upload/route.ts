import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const session = await auth();

  try {
    if (!session?.token) {
      return NextResponse.json(
        { error: "No token found" },
        { status: 401 }
      );
    }

    // Parse the incoming multipart body and forward as-is
    const formData = await request.formData();

    const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    const payload: UploadVideoResponse = await response.json();

    return NextResponse.json(payload, {
      status: response.ok ? 200 : response.status
    });
  } catch (error) {
    console.error("Upload video error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
