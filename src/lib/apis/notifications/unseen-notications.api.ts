import { auth } from "@/lib/auth";

export async function getUnSeenNotifications(page: number = 1): Promise<NotificationsResponse> {
  const session = await auth();
  if (!session?.token) throw new Error("No token found");

  const res = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point${page}&limit=15`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch unread notifications: ${res.status}`);
  }

  const payload: NotificationsResponse = await res.json();
  return payload;
}
