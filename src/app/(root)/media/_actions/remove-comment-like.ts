"use server";

export async function RemoveCommentLike(
  commentId: string | number,
  userId: string | number
) {
  // Make the API call to your backend
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point/${commentId}/i-hide-the-real-end-point?user_id=${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  //payload
  const payload: LikeResponse = await response.json();

  return payload;
}
