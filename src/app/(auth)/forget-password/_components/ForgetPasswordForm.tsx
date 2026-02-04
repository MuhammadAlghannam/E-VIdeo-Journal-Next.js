"use client"

import CustomeBtn from "@/components/shared/CustomeBtn"
import Spinner from "@/components/shared/Spinner"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ForgetPasswordFields, ForgetPasswordSchema } from "@/lib/schema/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { MoveRight } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import useForgetPassword from "../_hooks/use-forget-password"

export default function ForgetPasswordForm() {
  const form = useForm<ForgetPasswordFields>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  // Mutation
  const { forgetPassword, isPending } = useForgetPassword();


  // Submit
  const onSubmit: SubmitHandler<ForgetPasswordFields> = async (values) => {
    forgetPassword(values)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-h3-bold text-foreground">Forgot Password?</h1>
          <p className="text-h8-regular text-text-gray-dark">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email address" {...field} />
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
          {isPending ? <Spinner /> :
            <>
              Send Reset Link
              <MoveRight className="w-5 h-5 text-white" />
            </>}
        </CustomeBtn>
      </form>
    </Form>
  )
}
