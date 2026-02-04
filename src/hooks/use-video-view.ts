import { AddViewVideo } from "@/lib/actions/add-view-video.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useAddVideoView() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, mutate, data } = useMutation({
    mutationFn: async ({ mediaId }: { mediaId: number }) => {
      return await AddViewVideo(mediaId);
    },
    // Handle Success
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["video-view"],
      });

      router.refresh();
    },
  });

  return { addVideoView: mutate, isPending, data };
}
