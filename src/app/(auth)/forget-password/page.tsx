import BottomAuth from "@/components/features/auth/BottomAuth";
import type { Metadata } from "next";
import ForgetPasswordForm from "./_components/ForgetPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password",
};

export default function Page() {
  return (
    <>
      <ForgetPasswordForm />

      {/* Bottom Head Form */}
      <BottomAuth variant="forget-password" />
    </>
  )
}
