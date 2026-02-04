"use server";

import { auth } from "@/lib/auth";
import { UploadVideoTextFields } from "@/lib/schema/upload-video.shema";

export async function AddVideoTextForm(UploadVideoTextFields: UploadVideoTextFields) {
  const session = await auth();

  if (!session?.token) throw new Error('No token found')

  // Make the API call to your backend
  const response = await fetch(`${process.env.BASE_URL}/ui-hide-the-real-end-point`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.token}`,
    },
    body: JSON.stringify(UploadVideoTextFields),
  });

  //payload
  const payload: VideoTextFormResponse = await response.json();

  return payload;
}
