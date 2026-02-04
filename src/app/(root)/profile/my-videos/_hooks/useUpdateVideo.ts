import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useUpdateVideo() {
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
      const response = await fetch("/api/video/update", {
        method: "POST",
        body: formData,
      });

      const payload: UploadVideoResponse = await response.json();

      if ("error" in payload) {
        throw new Error(payload?.message || "Failed to update video");
      }

      return payload;
    },

    // Handle Success
    onSuccess: async () => {
      // Toast
      toast.success("Your Video has been updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["updateVideo"],
      });

      router.push("/profile/my-videos");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Error adding occasion");
    },
  });

  return { error, updateVideo: mutate, isPending };
}