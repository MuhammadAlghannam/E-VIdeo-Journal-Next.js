import { RemoveVideoBookmark } from "@/lib/actions/remove-video-bookmark.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useRemoveVideoBookmark() {
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
      return await RemoveVideoBookmark(mediaId, userId);
    },
    // Handle Success
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["video-remove-bookmark"],
      });

      router.refresh();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Error removing bookmark";
      toast.error(message);
    },
  });

  return { error, removeVideoBookmark: mutate, removePending: isPending };
}
