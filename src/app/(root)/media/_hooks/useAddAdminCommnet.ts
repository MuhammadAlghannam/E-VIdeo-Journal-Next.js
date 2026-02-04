import { CommentFields } from "@/lib/schema/comment.shema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddAdminComment } from "../_actions/add-admin-comment";

export default function useAddAdminCommnet() {
  const queryClient = useQueryClient()

  return useMutation<CreateCommentResponse, Error, CommentFields>({
    mutationFn: AddAdminComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['admin-comments']
      })

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Error adding occasion");
    },
  });
}