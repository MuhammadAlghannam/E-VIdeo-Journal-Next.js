import { ForgetPasswordFields } from "@/lib/schema/auth.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ForgetPasswordAction } from "../_actions/forget-password.action";

export default function useForgetPassword() {
  const queryClient = useQueryClient();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (body: ForgetPasswordFields) => {
      // Return payload so onSuccess can read it
      const payload = await ForgetPasswordAction(body);
      return payload;
    },

    onSuccess(payload) {
      // Prefer backend message/status if provided
      const msg =
        (payload?.message && String(payload.message)) ||
        (payload?.status && String(payload.status)) ||
        "Check your mail inbox to reset your password.";

      toast.success(msg);

      queryClient.invalidateQueries({ queryKey: ["forgetPassword"] });
    },

    onError(err: unknown) {
      const msg =
        err instanceof Error && err.message ? err.message : "An error occurred. Please try again.";
      toast.error(msg);
    },
  });

  return { error, forgetPassword: mutate, isPending };
}
