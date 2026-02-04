"use server";

import { CommentFields } from "@/lib/schema/comment.shema";

export async function AddReply(CommentFields: CommentFields) {
  // Make the API call to your backend
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(CommentFields),
  });

  //payload
  const payload: CreateCommentResponse = await response.json();

  return payload;
}
