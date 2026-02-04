import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

// Profile Image
export const ProfileImageSchema = z.object({
  profile_image: z
    .instanceof(File, { message: "Please select an image file" })
    .refine((f) => f.size <= 5 * 1024 * 1024, "Max file size is 5MB")
    .refine((f) => /^image\//.test(f.type), "File must be an image"),
});

// Profile
export const ProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Enter a valid Email",
    }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .or(z.literal("")),
  country_of_practices: z.string().min(1, { message: "Country of practices is required" }),
  academic_title: z.string().max(100).optional().or(z.literal("")),
  job_description: z.string().max(1000).optional().or(z.literal("")),
  institution: z.string().max(200).optional().or(z.literal("")),
  department: z.string().max(200).optional().or(z.literal("")),
  year_of_graduation: z
    .string()
    .min(1, { message: "Year of graduation is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Use format YYYY-MM-DD",
    }),
  country_of_graduation: z.string().min(1, { message: "Country of graduation is required" }),
});

// Change PW
export const ChangePWSchema = z
  .object({
    current_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Must include at least one uppercase letter",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Must include at least one lowercase letter",
      })
      .refine((val) => /\d/.test(val), { message: "Must include a number" })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: "Must include a symbol",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Must include at least one uppercase letter",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Must include at least one lowercase letter",
      })
      .refine((val) => /\d/.test(val), { message: "Must include a number" })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: "Must include a symbol",
      }),
    password_confirmation: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

// Type export
type ProfileFields = z.infer<typeof ProfileSchema>;
type ProfileImageFields = z.infer<typeof ProfileImageSchema>;
type ChangePWFields = z.infer<typeof ChangePWSchema>;

export type { ChangePWFields, ProfileFields, ProfileImageFields };
