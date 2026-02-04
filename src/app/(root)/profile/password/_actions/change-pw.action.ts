"use server";

import { ChangePWFields } from "@/lib/schema/profile.schema";

export default async function ChangePwAction(ChangePWFields: ChangePWFields) {
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-pointet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ChangePWFields),
  });

  // Throw on HTTP errors for better hook error handling
  if (!response.ok) {
    const errorMessage = `Change PW failed (${response.status})`;
    throw new Error(errorMessage);
  }

  const payload: string = await response.json();
  return payload;
}
