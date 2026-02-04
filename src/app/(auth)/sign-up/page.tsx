import BottomAuth from "@/components/features/auth/BottomAuth";
import type { Metadata } from "next";
import SignUpForm from "./_components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function Page() {
  return (
    <>
      <SignUpForm />

      {/* Bottom Head Form */}
      <BottomAuth variant="signup" />
    </>
  )
}
