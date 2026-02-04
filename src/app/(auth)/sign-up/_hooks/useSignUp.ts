import { RegisterFields } from "@/lib/schema/auth.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignUp } from "../_actions/signup-actions";

export default function useSignUp() {
  // Router
  const router = useRouter();
  const queryClient = useQueryClient()

  // Mutation
  const { isPending, error, mutate } = useMutation({
    // fun
    mutationFn: async (RegisterFields: RegisterFields) => {
      const response = await SignUp(RegisterFields);
      if ("error" in response && response.error) {
        // If it's a validation error with field-specific messages
        if (typeof response.message === 'object' && response.message !== null) {
          throw response; // Throw the entire response object to preserve field errors
        }
        // If it's a general error message
        throw new Error(typeof response.message === 'string' ? response.message : response.error);
      }
    },

    // Handle Success
    onSuccess() {
      // Toast
      toast.success("Your account has been created successfully");

      queryClient.invalidateQueries({
        queryKey: ['signup']
      })

      // navigate to login page if account created
      setTimeout(() => router.push("/login"), 1000);
    },
    onError: error => {
      // If it's a validation error with field messages, don't show toast
      if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'object') {
        return; // Field-specific errors will be handled in the form
      }
      // Show toast for general errors
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  });

  return { error, register: mutate, isPending };
}