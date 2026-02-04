"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ProfileFields, ProfileSchema } from "@/lib/schema/profile.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format as formatDate } from "date-fns";
import { Calendar as CalendarIcon, MoveRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import useUpdateProfile from "../_hooks/use-update-profile";

export default function ProfileForm({ initialUser }: { initialUser?: ApiUser }) {
  const { data: session } = useSession();

  // Mutation
  const { updateProfile, isPending } = useUpdateProfile();

  // Form
  const form = useForm<ProfileFields>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: initialUser?.name ?? "",
      email: initialUser?.email ?? "",
      phone: initialUser?.phone ?? "",
      country_of_practices: initialUser?.country_of_practices ?? "",
      academic_title: initialUser?.academic_title ?? "",
      job_description: initialUser?.job_description ?? "",
      institution: initialUser?.institution ?? "",
      department: initialUser?.department ?? "",
      year_of_graduation: initialUser?.year_of_graduation ?? "",
      country_of_graduation: initialUser?.country_of_graduation ?? "",
    },
    mode: "onBlur",
  });

  // Function
  const onSubmit: SubmitHandler<ProfileFields> = async (values) => {
    if (!session?.user) {
      return;
    }

    if (!(values.name && values.email && values.phone)) return;

    updateProfile({
      ...values,
      user_id: initialUser?.id ?? session?.user.id,
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Name" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput international placeholder="Phone (e.g. 1234567890)" autoComplete="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country of practices */}
          <FormField
            control={form.control}
            name="country_of_practices"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of practices</FormLabel>
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

          {/* Academic title */}
          <FormField
            control={form.control}
            name="academic_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academic title</FormLabel>
                <FormControl>
                  <Input placeholder="Academic title (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job description */}
          <FormField
            control={form.control}
            name="job_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job description</FormLabel>
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

          {/* Institution */}
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <FormControl>
                  <Input placeholder="Institution (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Department */}
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="Department (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Year of graduation */}
          <FormField
            control={form.control}
            name="year_of_graduation"
            render={({ field }) => {
              const selectedDate = field.value ? new Date(field.value) : undefined
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Year of graduation</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full !bg-transparent justify-start pl-3 text-left font-normal hover:text-black",
                            !selectedDate && "!text-text-gray-dark"
                          )}
                        >
                          {selectedDate ? (
                            formatDate(selectedDate, "PPP")
                          ) : (
                            <span className="!text-text-gray-dark text-h8-regular px-3 py-3">Year of graduation</span>
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

          {/* Country of graduation */}
          <FormField
            control={form.control}
            name="country_of_graduation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of graduation</FormLabel>
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

          {/* Update button */}
          <CustomeBtn
            type="submit"
            disabled={isPending || !form.formState.isDirty || (form.formState.isSubmitted && !form.formState.isValid)}
            className="bg-primary p-6 mt-2 text-h8-regular text-white text-center ms-auto w-fit">
            {isPending ? <Spinner /> :
              <>
                Update Profile
                <MoveRight className="w-5 h-5 text-white" />
              </>}
          </CustomeBtn>
        </form>
      </Form>
    </div>
  );
}
