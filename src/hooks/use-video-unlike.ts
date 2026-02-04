import { RemoveVideoLike } from "@/lib/actions/remove-like-video.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useRemoveVideolike() {
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
      return await RemoveVideoLike(mediaId, userId);
    },
    // Handle Success
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["video-unlike"],
      });

      router.refresh();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Error removing like";
      toast.error(message);
    },
  });

  return { error, removeVideoLike: mutate, removePending: isPending };
}
