import { AddVideoBookmark } from "@/lib/actions/bookmark-video.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useVideoBookmark() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({
      mediaId,
      userId,
    }: {
      mediaId: string | number;
      userId: string | number;
    }) => {
      return await AddVideoBookmark(mediaId, userId);
    },
    // Handle Success
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["video-bookmark"],
      });

      router.refresh();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Error adding bookmark";
      toast.error(message);
    },
  });

  return { error, addVideoBookmark: mutate, isPending };
}
