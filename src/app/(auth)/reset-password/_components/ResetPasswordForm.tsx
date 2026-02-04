"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import Spinner from "@/components/shared/Spinner";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetPasswordFields, ResetPasswordSchema } from "@/lib/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { useSearchParams } from "next/navigation"; // ⬅️ usePathname & useSearchParams
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useResetPassword from "../_hooks/use-reset-password";

export default function ResetPasswordForm() {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  //  Get email & token from URL
  const searchParams = useSearchParams();

  // Extract email from query params (?email=...)
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  // Mutation
  const { resetPassword, isPending } = useResetPassword();

  // Form
  const form = useForm<ResetPasswordFields>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: "", password_confirmation: "" },
    mode: "onChange",
  });

  // Submit
  const onSubmit: SubmitHandler<ResetPasswordFields> = (values) => {
    const payload = { ...values, email, token };
    resetPassword(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-h3-bold text-foreground">Change Password</h1>
          <p className="text-h8-regular text-text-gray-dark">
            Choose a new password for your account.
          </p>
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New password"
                    {...field}
                  />
                  <button
                    type="button"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowNewPassword((s) => !s)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-text-gray-dark hover:text-foreground"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    {...field}
                  />
                  <button
                    type="button"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-text-gray-dark hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomeBtn
          type="submit"
          disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
          className="bg-primary py-6 mt-2 text-h8-regular text-white text-center w-full"
        >
          {isPending ? (
            <Spinner />
          ) : (
            <>
              Change Password
              <MoveRight className="w-5 h-5 text-white" />
            </>
          )}
        </CustomeBtn>
      </form>
    </Form>
  );
}