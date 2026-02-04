import { CommentFields } from "@/lib/schema/comment.shema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddComment } from "../_actions/comment-actions";

export default function useComment() {
  const queryClient = useQueryClient()

  return useMutation<CreateCommentResponse, Error, CommentFields>({
    mutationFn: AddComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['comments']
      })

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Error adding occasion");
    },
  });
}