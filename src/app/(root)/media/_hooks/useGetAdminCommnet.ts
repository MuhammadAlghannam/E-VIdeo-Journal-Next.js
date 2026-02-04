import { useQuery } from "@tanstack/react-query";

export default function useGetAdminCommnet(mediaId: string, userId?: string) {
  const { isPending, error, data: payload } = useQuery({
    queryKey: ["admin-comments", mediaId, userId ?? null],
    queryFn: async () => {
      const params = new URLSearchParams({
        media_id: mediaId,
      });
      const response = await fetch(`/api/admin-commnet?${params.toString()}`);

      const payload: GetAdminCommentsResponse = await response.json();

      if ("error" in payload) {
        throw new Error(payload?.message || "Failed to load comments");
      }

      return payload;
    },
    enabled: !!mediaId,
  });

  return { payload, error, isPending };
}


