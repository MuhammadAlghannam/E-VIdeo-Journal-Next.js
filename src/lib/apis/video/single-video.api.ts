import { auth } from "@/lib/auth";

export async function singleVideo(mediaId: number | string): Promise<SingleVideoResponse> {
  const session = await auth();

  if (!session?.token) throw new Error('No token found')

  try {
    const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point?media_id=${mediaId}`, {
      headers: {
        'Authorization': `Bearer ${session?.token}`,
      },
    });
    const payload: SingleVideoResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching Featured Videos", error);
    throw error as Error;
  }
}
