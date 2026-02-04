"use server";

import { auth } from "@/lib/auth";

export async function DeleteComment(
  commentId: string | number,
  userId: string | number
) {
  const session = await auth();

  if (!session?.token) throw new Error('No token found')

  // Make the API call to your backend
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.token}`,
    },
    body: JSON.stringify({ comment_id: commentId, user_id: userId }),
  });

  //payload
  const payload: LikeResponse = await response.json();

  return payload;
}
