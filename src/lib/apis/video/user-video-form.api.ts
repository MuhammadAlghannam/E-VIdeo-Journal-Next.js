import { auth } from "@/lib/auth";

export async function getUserVideoForm(form_id?: string | number): Promise<VideoTextForm> {
  // Session
  const session = await auth();
  if (!session?.token) throw new Error("No token found");

  try {
    const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point/${form_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    const payload: VideoTextForm = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching user data form", error);
    throw error as Error;
  }
}
