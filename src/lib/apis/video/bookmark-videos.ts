import { auth } from "@/lib/auth";

export async function getBookMarkVideos(user_id?: string | number): Promise<GetBookmarksResponse> {
  const session = await auth();

  if (!session?.token) throw new Error('No token found')

  try {
    const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point?user_id=${user_id}`, {
      cache: "no-store",
      headers: {
        'Authorization': `Bearer ${session?.token}`,
      },
    });
    const payload: GetBookmarksResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching Bookmarks Videos", error);
    throw error as Error;
  }
}
