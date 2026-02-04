"use client";

import { ResetPasswordFields } from "@/lib/schema/auth.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ResetPasswordAction } from "../_actions/reset-password.action";

// Extend request
type ResetPasswordRequest = ResetPasswordFields & {
  email: string;
  token: string;
};

export default function useResetPassword() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (body: ResetPasswordRequest) => {
      const payload = await ResetPasswordAction(body);
      return payload;
    },

    onSuccess(payload) {
      // backend may return { success: false, message: "...error..." }
      const success = payload?.success !== false; // treat false as failure
      const msg =
        (payload?.message && String(payload.message)) ||
        (payload?.status && String(payload.status)) ||
        (success ? "Password changed successfully." : "Failed to reset password.");

      if (success) {
        // green toast on real success
        toast.success(msg);

        // optional delay before redirect
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        //  red toast when backend says success:false
        toast.error(msg);
      }

      queryClient.invalidateQueries({ queryKey: ["resetPassword"] });
    },

    onError(err: unknown) {
      // handle thrown network/validation errors
      const msg =
        err instanceof Error && err.message ? err.message : "An error occurred. Please try again.";
      toast.error(msg);
    },
  });

  return { error, resetPassword: mutate, isPending };
}
