import { DeleteAccount } from "@/lib/actions/delete-account.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

type DeleteAccountPayload = { user_id: string | number; email: string };

type DeleteAccountResponse = string;

export default function useDeleteAccount() {
  const queryClient = useQueryClient();

  const { isPending, error, mutate } = useMutation<
    DeleteAccountResponse,
    Error,
    DeleteAccountPayload
  >({
    mutationFn: async (payload: DeleteAccountPayload) => {
      const response = await DeleteAccount(payload);
      return response;
    },
    onSuccess: async () => {
      toast.success("Your account has been deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["deleteAccount"] });
      setTimeout(() => {
        // Sign out the user after 1 second
        signOut({ callbackUrl: "/" });
      }, 1000);
    },
    onError: (err) => {
      toast.error(err.message || "Error deleting account");
    },
  });

  return { error, deleteAccount: mutate, isPending };
}
