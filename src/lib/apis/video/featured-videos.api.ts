export async function getFeaturedVideos(user_id?: string | number): Promise<VideoResponse> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point?user_id=${user_id}`, {
      cache: "no-store",
    });
    const payload: VideoResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching Featured Videos", error);
    throw error as Error;
  }
}
