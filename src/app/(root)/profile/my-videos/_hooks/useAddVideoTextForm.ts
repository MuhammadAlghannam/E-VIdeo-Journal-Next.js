import { UploadVideoTextFields } from "@/lib/schema/upload-video.shema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddVideoTextForm } from "../_actions/add_video_text_form";

export default function useAddVideoTextForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, mutate } = useMutation<
    VideoTextFormResponse,
    Error,
    UploadVideoTextFields
  >({
    // fun
    mutationFn: async (UploadVideoTextFields: UploadVideoTextFields) => {
      const response = await AddVideoTextForm(UploadVideoTextFields);

      if (response?.error) throw new Error(response.error);

      return response;
    },

    // Handle Success
    onSuccess: async () => {
      // Toast
      toast.success("Your Form has been submited successfully");

      queryClient.invalidateQueries({
        queryKey: ["add-video-text-form"],
      });

      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Error adding occasion");
    },
  });

  return { addVideoTextForm: mutate, isPending };
}
