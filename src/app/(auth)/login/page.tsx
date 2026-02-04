import BottomAuth from "@/components/features/auth/BottomAuth";
import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>

      {/* Bottom Head Form */}
      <BottomAuth variant="login" />
    </>
  )
}
