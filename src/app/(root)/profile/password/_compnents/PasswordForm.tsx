"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import Spinner from "@/components/shared/Spinner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePWFields, ChangePWSchema } from "@/lib/schema/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useChangePW from "../_hooks/use-change-pw";

export default function PasswordForm() {

  // States
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  // Session
  const { data: session } = useSession();

  // Form
  const form = useForm<ChangePWFields>({
    resolver: zodResolver(ChangePWSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onBlur",
  });

  // Mutation
  const { changePw, isPending } = useChangePW();

  // Functions
  const onSubmit: SubmitHandler<ChangePWFields> = async (values) => {
    const chnagePwData = {
      current_password: values.current_password,
      password: values.password,
      password_confirmation: values.password_confirmation,
      email: session?.user?.email
    }
    changePw(chnagePwData, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">


          {/* Current PW */}
          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your current password"
                      autoComplete="new-password"
                      className="pr-12"
                      {...field}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-gray-dark hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New PW */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      className="pr-12"
                      {...field}
                    />
                    <button
                      type="button"
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowNewPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-gray-dark hover:text-foreground"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm PW */}
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPasswordConfirm ? "text" : "password"}
                      placeholder="confirm your new password"
                      autoComplete="new-password"
                      className="pr-12"
                      {...field}
                    />
                    <button
                      type="button"
                      aria-label={showPasswordConfirm ? "Hide password" : "Show password"}
                      onClick={() => setShowPasswordConfirm((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-gray-dark hover:text-foreground"
                    >
                      {showPasswordConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Update button */}
          <CustomeBtn
            type="submit"
            disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
            className="bg-primary p-6 mt-2 text-h8-regular text-white text-center ms-auto w-fit">
            {isPending ? (
              <Spinner />
            ) : (
              <>
                Update Password
                <MoveRight className="w-5 h-5 text-white" />
              </>
            )}
          </CustomeBtn>
        </form>
      </Form>
    </div>
  );
}
