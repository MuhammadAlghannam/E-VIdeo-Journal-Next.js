import { auth } from "@/lib/auth";

export default async function getNotifications(page: number = 1): Promise<NotificationsResponse> {
  const session = await auth();
  if (!session?.token) throw new Error("No token found");

  try {
    const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point${page}&limit=15`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.status}`);
    }

    const payload: NotificationsResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error as Error;
  }
}
