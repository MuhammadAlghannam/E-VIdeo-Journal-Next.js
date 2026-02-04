export async function getRecentlyAddedVideos(): Promise<VideoResponse> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`);
    const payload: VideoResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error as Error;
  }
}
