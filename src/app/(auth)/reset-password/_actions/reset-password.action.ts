"use server";

import { ResetPasswordFields } from "@/lib/schema/auth.schema";

// Extend the request shape to include email & token
type ResetPasswordRequest = ResetPasswordFields & {
  email: string;
  token: string;
};

export async function ResetPasswordAction(body: ResetPasswordRequest) {
  // Make the API call to your backend
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  //payload
  const payload = await response.json();

  return payload;
}
