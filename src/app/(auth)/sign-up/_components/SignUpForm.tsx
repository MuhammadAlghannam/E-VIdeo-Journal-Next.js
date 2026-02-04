"use client"
import CustomeBtn from "@/components/shared/CustomeBtn";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { RegisterFields, SignupSchema } from "@/lib/schema/auth.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format as formatDate } from "date-fns";
import { Calendar as CalendarIcon, Eye, EyeOff, MoveRight } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSignUp from "../_hooks/useSignUp";


export default function SignUpForm() {
  // States
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  // Mutation
  const { register, error, isPending } = useSignUp();


  const form = useForm<RegisterFields>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      country_of_practices: "",
      academic_title: "",
      job_description: "",
      institution: "",
      department: "",
      year_of_graduation: "",
      country_of_graduation: "",
    },
    mode: "onBlur",
  })

  // Submit
  const onSubmit: SubmitHandler<RegisterFields> = async (values) => {
    const newSignUp = {
      role: "user",
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
      password_confirmation: values.password_confirmation,
      country_of_practices: values.country_of_practices,
      academic_title: values.academic_title,
      job_description: values.job_description,
      institution: values.institution,
      department: values.department,
      year_of_graduation: values.year_of_graduation,
      country_of_graduation: values.country_of_graduation,
    }

    register(newSignUp)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Name" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage>
                {error && typeof error.message === 'object' && (error.message as Record<string, string>)?.email && (
                  <span className="text-destructive">{(error.message as Record<string, string>).email}</span>
                )}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneInput defaultCountry="EG" international placeholder="Phone (e.g. 1234567890)" autoComplete="tel" {...field} />
              </FormControl>
              <FormMessage>
                {error && typeof error.message === 'object' && (error.message as Record<string, string>)?.phone && (
                  <span className="text-destructive">{(error.message as Record<string, string>).phone}</span>
                )}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="Confirm password"
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

        <FormField
          control={form.control}
          name="country_of_practices"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CountryDropdown
                  placeholder="Country of practices"
                  defaultValue={field.value}
                  onChange={(country) => {
                    field.onChange(country.name)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="academic_title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Academic title (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="job_description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Job description (optional)"
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Institution (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Department (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year_of_graduation"
          render={({ field }) => {
            const selectedDate = field.value ? new Date(field.value) : undefined
            return (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full !bg-transparent justify-start pl-3 text-left font-normal",
                          !selectedDate && "text-text-gray-dark"
                        )}
                      >
                        {selectedDate ? (
                          formatDate(selectedDate, "PPP")
                        ) : (
                          <span className="text-text-gray-dark text-h8-regular px-3 py-3">Year of graduation</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) =>
                        field.onChange(date ? formatDate(date, "yyyy-MM-dd") : "")
                      }
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="country_of_graduation"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CountryDropdown
                  placeholder="Country of graduation"
                  defaultValue={field.value}
                  onChange={(country) => {
                    field.onChange(country.name)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomeBtn
          type="submit"
          disabled={isPending || form.formState.isSubmitted && !form.formState.isValid}
          className="bg-primary py-6 mt-2 text-h8-regular text-white text-center w-full"
        >
          {isPending ? <Spinner /> :
            <>
              Create account
              <MoveRight className="w-5 h-5 text-white" />
            </>}
        </CustomeBtn>
      </form>
    </Form>
  )
}
