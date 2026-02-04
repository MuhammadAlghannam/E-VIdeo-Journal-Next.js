"use server";

export async function RemoveVideoBookmark(mediaId: string | number, userId: string | number) {
  // Make the API call to your backend
  const response = await fetch(
    `${process.env.BASE_URL}/i-hide-the-real-end-point=${mediaId}&user_id=${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  //payload
  const payload: UnlikeResponse = await response.json();

  return payload;
}
