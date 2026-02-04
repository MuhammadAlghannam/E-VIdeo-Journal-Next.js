import { auth } from "@/lib/auth";

export async function getMyVideos(user_id?: string | number): Promise<MyVideosResponse> {
  // Session
  const session = await auth();
  if (!session?.token) throw new Error("No token found");

  try {
    const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point?user_id=${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    const payload: MyVideosResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching My Videos", error);
    throw error as Error;
  }
}
