"use server";

export async function RemoveVideoLike(mediaId: string | number, userId: string | number) {
  // Make the API call to your backend
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point/${mediaId}/i-hide-the-real-end-point?user_id=${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  //payload
  const payload: UnlikeResponse = await response.json();

  return payload;
}
