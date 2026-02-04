import { CommentFields } from "@/lib/schema/comment.shema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddReply } from "../_actions/reply-action";

export default function useReply() {
  const queryClient = useQueryClient()

  return useMutation<CreateCommentResponse, Error, CommentFields>({
    mutationFn: AddReply,
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