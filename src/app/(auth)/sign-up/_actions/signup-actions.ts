"use server";

import { RegisterFields } from "@/lib/schema/auth.schema";

export async function SignUp(RegisterFields: RegisterFields) {
  // Make the API call to your backend
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(RegisterFields),
  });

  //payload
  const payload: RegisterResponse = await response.json();

  return payload;
}
