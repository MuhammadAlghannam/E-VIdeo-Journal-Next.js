import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useUploadVideo() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Mutation
  const { isPending, error, mutate } = useMutation<
    UploadVideoResponse,
    Error,
    FormData
  >({
    // Accept the actual FormData and return server payload
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/video/upload", {
        method: "POST",
        body: formData,
      });

      const payload: UploadVideoResponse = await response.json();

      if ("error" in payload) {
        throw new Error(payload?.message || "Failed to upload video");
      }

      return payload;
    },

    // Handle Success
    onSuccess: async () => {
      // Toast
      toast.success("Your Video has been uploaded successfully");

      queryClient.invalidateQueries({
        queryKey: ["uploadVideo"],
      });

      router.push("/profile/my-videos");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Error adding occasion");
    },
  });

  return { error, uploadVideo: mutate, isPending };
}