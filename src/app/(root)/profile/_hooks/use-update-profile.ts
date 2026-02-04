import { ProfileFields } from "@/lib/schema/profile.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UpdateProfileAction from "../_actions/update-profile.action";

// Accept variables that include user_id in addition to ProfileFields
type UpdatePayload = ProfileFields & { user_id: string | number };

export default function useUpdateProfile() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, error, mutate } = useMutation<
    ProfileResponse,
    Error,
    UpdatePayload
  >({
    // fun
    mutationFn: async (ProfileFields: UpdatePayload) => {
      const response = await UpdateProfileAction(ProfileFields);

      if (response?.error) throw new Error(response.error);

      return response;
    },

    // Handle Success
    onSuccess: async () => {
      // Toast
      toast.success("Your profile has been updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["updateProfile"],
      });

      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Error adding occasion");
    },
  });

  return { error, updateProfile: mutate, isPending };
}
