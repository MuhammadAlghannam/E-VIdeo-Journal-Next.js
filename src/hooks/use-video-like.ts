import { AddVideoLike } from "@/lib/actions/add-like-video.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useAddVideoLike() {
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
      return await AddVideoLike(mediaId, userId);
    },
    // Handle Success
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["video-like"],
      });

      router.refresh();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Error adding like";
      toast.error(message);
    },
  });

  return { error, addVideoLike: mutate, isPending };
}
