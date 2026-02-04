"use server";

export async function UploadImageAction(formData: FormData) {
  // Send multipart/form-data exactly as provided (do NOT set Content-Type manually)
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    method: "POST",
    body: formData,
    // credentials, headers etc are unnecessary for pure multipart passthrough
  });

  // Throw on HTTP errors for better hook error handling
  if (!response.ok) {
    const errorMessage = `Upload failed (${response.status})`;
    throw new Error(errorMessage);
  }

  const payload: ProfileResponse = await response.json();
  return payload;
}
