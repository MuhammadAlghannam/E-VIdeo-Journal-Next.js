import { useQuery } from "@tanstack/react-query";

export default function useGetComments(mediaId: string, userId?: string) {
  const {
    isPending,
    error,
    data: payload,
  } = useQuery({
    queryKey: ["comments", mediaId, userId ?? null],
    queryFn: async () => {
      const params = new URLSearchParams({
        media_id: mediaId,
        user_id: userId ?? "",
      });
      const response = await fetch(`/api/comments?${params.toString()}`);

      const payload: GetCommentsResponse = await response.json();

      if ("error" in payload) {
        throw new Error(payload?.message || "Failed to load comments");
      }

      return payload;
    },
    enabled: !!mediaId,
  });

  return { payload, error, isPending };
}
