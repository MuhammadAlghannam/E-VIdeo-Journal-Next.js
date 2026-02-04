import { auth } from "@/lib/auth";

export default async function getUserInfo(): Promise<ApiUser> {
  const session = await auth();
  if (!session?.token) throw new Error("No token found");

  try {
    const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }

    const payload: { user: ApiUser } = await response.json();
    return payload.user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error as Error;
  }
}
