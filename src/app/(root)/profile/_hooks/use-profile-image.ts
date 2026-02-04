import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UploadImageAction } from "../_actions/upload-image.action";

export default function useUpdateProfileImage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    // Accept the actual FormData and return server payload
    mutationFn: async (formData: FormData) => {
      const response = await UploadImageAction(formData);

      if (response?.error) throw new Error(response.error);

      return response;
    },

    // Handle Success
    onSuccess() {
      // Toast
      toast.success("Your Image uploaded successfully");

      queryClient.invalidateQueries({
        queryKey: ["updateProfile"],
      });

      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Error updating profile image");
    },
  });

  return { error, uploadImage: mutate, isPending };
}
