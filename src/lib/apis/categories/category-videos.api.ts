export async function getCategoryVideos(
  user_id: number | string,
  sub_category_id: number | string
): Promise<SubCategoryVideosResponse> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point=${sub_category_id}&user_id=${user_id}`);
    const payload: SubCategoryVideosResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error as Error;
  }
}
