
export async function SerialNumber(serialNumberId: number | string): Promise<SingleVideoResponse> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point/${serialNumberId}`);
    const payload: SingleVideoResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching Featured Videos", error);
    throw error as Error;
  }
}
