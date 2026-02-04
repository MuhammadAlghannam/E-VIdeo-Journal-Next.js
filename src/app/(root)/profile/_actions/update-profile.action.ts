"use server";

import { ProfileFields } from "@/lib/schema/profile.schema";

export default async function UpdateProfileAction(ProfileFields: ProfileFields) {
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ProfileFields),
  });

  // Throw on HTTP errors for better hook error handling
  if (!response.ok) {
    const errorMessage = `Update failed (${response.status})`;
    throw new Error(errorMessage);
  }

  const payload: ProfileResponse = await response.json();
  return payload;
}
