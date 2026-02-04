"use server";

export type ViewSuccessResponse = {
  views: number;
  message: string;
};

export type ViewErrorResponse = {
  error: string;
  message: string;
};

export type ViewResponse = ViewSuccessResponse | ViewErrorResponse;

export async function AddViewVideo(mediaId: string | number): Promise<ViewResponse> {
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ media_id: mediaId }),
  });

  const payload: ViewResponse = await response.json();
  return payload;
}
