import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

// Login
export const LoginSchema = z.object({
  login: z
    .string()
    .trim()
    .min(1, { message: "Email or phone is required" })
    .refine(
      (value) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isPhone = isValidPhoneNumber(value);
        return isEmail || isPhone;
      },
      { message: "Enter a valid email or phone number" },
    ),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

// Sign Up
export const SignupSchema = z
  .object({
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
    password_confirmation: z.string().min(1, {
      message: "Please confirm your password",
    }),
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
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

// Forget Password
export const ForgetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Enter a valid email address",
    }),
});

// Change Password
export const ChangePasswordSchema = z
  .object({
    new_password: z
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
    confirm_password: z.string().min(1, {
      message: "Please confirm your new password",
    }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

// Reset Password
export const ResetPasswordSchema = z
  .object({
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
    password_confirmation: z.string().min(1, {
      message: "Please confirm your new password",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

// Type export
type LoginFields = z.infer<typeof LoginSchema>;
type RegisterFields = z.infer<typeof SignupSchema>;
type ForgetPasswordFields = z.infer<typeof ForgetPasswordSchema>;
type ChangePasswordFields = z.infer<typeof ChangePasswordSchema>;
type ResetPasswordFields = z.infer<typeof ResetPasswordSchema>;

export type {
  ChangePasswordFields,
  ForgetPasswordFields,
  LoginFields,
  RegisterFields,
  ResetPasswordFields,
};
