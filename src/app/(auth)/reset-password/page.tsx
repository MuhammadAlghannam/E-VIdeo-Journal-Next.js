import BottomAuth from "@/components/features/auth/BottomAuth";
import type { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordForm from "./_components/ResetPasswordForm";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>

      {/* Bottom Head Form */}
      <BottomAuth variant="change-password" />
    </>
  )
}
