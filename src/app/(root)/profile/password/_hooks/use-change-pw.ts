import { ChangePWFields } from "@/lib/schema/profile.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ChangePwAction from "../_actions/change-pw.action";

// Accept variables that include user_id in addition to ProfileField

export default function useChangePW() {
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, error, mutate } = useMutation<string, Error, ChangePWFields>({
    // fun
    mutationFn: async (ChangePWFields: ChangePWFields) => {
      const response = await ChangePwAction(ChangePWFields);
      return response;
    },

    // Handle Success
    onSuccess: async () => {
      // Toast
      toast.success("Your password has been changed successfully");

      queryClient.invalidateQueries({
        queryKey: ["changePw"],
      });
    },
    onError: (error) => {
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message?: unknown }).message === "object"
      ) {
        return; // field errors handled elsewhere
      }
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });

  return { error, changePw: mutate, isPending };
}
