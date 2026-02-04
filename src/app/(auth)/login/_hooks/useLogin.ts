import { LoginFields } from "@/lib/schema/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function useLogin() {
  // Navigation
  const searchParams = useSearchParams();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (loginField: LoginFields) => {
      // Prefer ?callbackUrl=..., else previous page (not /login), else "/"
      const storedPrev = typeof window !== "undefined" ? localStorage.getItem("prevUrl") || "" : "";
      const raw = searchParams.get("callbackUrl") || storedPrev || "/";

      const decoded = decodeURIComponent(raw);
      const callbackUrl =
        typeof window !== "undefined"
          ? new URL(decoded, window.location.origin).toString()
          : decoded;

      const response = await signIn("credentials", {
        login: loginField.login,
        password: loginField.password,
        redirect: false,
        // Make the user back to the same page before login
        callbackUrl,
      });

      // NextAuth v5 returns { error?: string, url?: string }
      if (response?.error) {
        const friendly =
          response.error === "CredentialsSignin" ? "Invalid email or password" : response.error;
        throw new Error(friendly);
      }
      if (response?.code) throw new Error(response.code);

      // ✅ Always return a url, falling back to the callback we computed
      return { ...response, url: response?.url || callbackUrl };
    },
    onSuccess: (data) => {
      toast.success("Login successful");

      // navigate to login page if account created
      // setTimeout(() => router.push("/"), 1000);
      setTimeout(() => {
        try {
          const prevUrl = localStorage.getItem("prevUrl");
          if (prevUrl) {
            localStorage.removeItem("prevUrl"); // ✅ clear after redirect
            window.location.href = prevUrl;
            return;
          }
        } catch { }
        window.location.href = data?.url || "/";
      }, 1000);
    },
    onError: (error) => toast.error(error.message),
  });

  return { isPending, error, login: mutate };
}
