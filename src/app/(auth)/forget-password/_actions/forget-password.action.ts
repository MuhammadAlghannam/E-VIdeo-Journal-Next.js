"use server";

import { ForgetPasswordFields } from "@/lib/schema/auth.schema";

export async function ForgetPasswordAction(ForgetPasswordFields: ForgetPasswordFields) {
  // Make the API call to your backend
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ForgetPasswordFields),
  });

  //payload
  const payload = await response.json();

  return payload;
}
