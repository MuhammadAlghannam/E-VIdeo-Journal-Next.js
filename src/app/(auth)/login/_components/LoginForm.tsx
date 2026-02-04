"use client"
import CustomeBtn from "@/components/shared/CustomeBtn"
import Spinner from "@/components/shared/Spinner"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginFields, LoginSchema } from "@/lib/schema/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, MoveRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import useLogin from "../_hooks/useLogin"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  // Mutation
  const { isPending, error, login } = useLogin();

  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  })

  // Submit
  const onSubmit: SubmitHandler<LoginFields> = async (values) => {
    login(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Error Message */}
        {error && <p className="text-destructive text-h7-regular mb-2">{error.message}</p>}

        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormControl>
                <Input placeholder="Email or phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((s) => !s)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-text-gray-dark hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Link href="/forget-password" className="text-h8-regular text-primary">Forgot  password ?</Link>
        </div>

        <CustomeBtn
          type="submit"
          disabled={isPending || form.formState.isSubmitted && !form.formState.isValid}
          className="bg-primary py-6 mt-2 text-h8-regular text-white text-center w-full"
        >
          {isPending ? <Spinner /> :
            <>
              Login
              <MoveRight className="w-5 h-5 text-white" />
            </>}
        </CustomeBtn>
      </form>
    </Form>
  )
}
