"use server";

export async function AddVideoLike(mediaId: string | number, userId: string | number) {
  // Make the API call to your backend
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point/${mediaId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId }),
  });

  //payload
  const payload: LikeResponse = await response.json();
  return payload;
}
