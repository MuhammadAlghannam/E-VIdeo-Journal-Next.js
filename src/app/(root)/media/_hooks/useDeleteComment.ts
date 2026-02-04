import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DeleteComment } from "../_actions/delete-comment-action";

export default function useCommentLike() {
  const queryClient = useQueryClient()

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ commentId, userId }: { commentId: string | number; userId: string | number }) => {
      return await DeleteComment(commentId, userId);
    },
    // Handle Success
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Error deleting comment";
      toast.error(message);
    },
  });

  return { error, commentLike: mutate, isPending };
}