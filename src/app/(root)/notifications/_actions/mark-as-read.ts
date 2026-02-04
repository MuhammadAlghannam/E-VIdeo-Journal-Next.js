"use server";

import { auth } from "@/lib/auth";

export async function MarkAsSeenAction(id: number) {
  const session = await auth();
  if (!session?.token) throw new Error("No token found");

  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify({ id }),
  });
  const payload = await response.json();
  return payload;
}
