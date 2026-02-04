import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddCommentLike } from "../_actions/add-comment-like";

export default function useCommentLike() {
  const queryClient = useQueryClient()

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ commentId, userId }: { commentId: string | number; userId: string | number }) => {
      return await AddCommentLike(commentId, userId);
    },
    // Handle Success
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Error adding like";
      toast.error(message);
    },
  });

  return { error, commentLike: mutate, isPending };
}