"use server";

export async function AddVideoBookmark(mediaId: string | number, userId: string | number) {
  // Make the API call to your backend
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, media_id: mediaId, flag: "1" }),
  });

  //payload
  const payload: BookmarkAddResponse = await response.json();

  return payload;
}
