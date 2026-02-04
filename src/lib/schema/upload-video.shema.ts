import { z } from "zod";

export const UploadVideoSchema = z.object({
  file: z
    .any()
    .refine((val) => (val instanceof File && val.size > 0) || (typeof val === 'string' && val !== ''), {
      message: "Video file is required",
    })
    .refine((val) => val instanceof File ? val.size <= 3 * 1024 * 1024 * 1024 : true, {
      message: "Video must be 3 GB or less",
    }),
  thumbnail_path: z
    .any()
    .refine((val) => (val instanceof File && val.size > 0) || (typeof val === 'string' && val !== ''), {
      message: "Thumbnail image is required",
    })
    .refine(
      (val) => (val instanceof File ? val.size <= 5 * 1024 * 1024 : true),
      { message: "Image must be 5 MB or less" }
    )
    .refine(
      (val) =>
        val instanceof File
          ? ["image/jpeg", "image/png", "image/jpg"].includes(val.type)
          : true,
      { message: "Only JPG, JPEG, or PNG images are allowed" }
    ),
  image_path: z
    .any()
    .optional()
    .refine((val) => val === undefined || val === "" || val instanceof File || typeof val === 'string', {
      message: "Image must be a file",
    })
    .refine(
      (val) => (val instanceof File ? val.size <= 5 * 1024 * 1024 : true),
      { message: "Image must be 5 MB or less" }
    )
    .refine(
      (val) =>
        val instanceof File
          ? ["image/jpeg", "image/png", "image/jpg"].includes(val.type)
          : true,
      { message: "Only JPG, JPEG, or PNG images are allowed" }
    ),
  pdf: z
    .any()
    .optional()
    .refine((val) => val === undefined || val === "" || val instanceof File || typeof val === 'string', {
      message: "PDF must be a file or empty",
    })
    .refine((val) => (val instanceof File ? val.size <= 50 * 1024 * 1024 : true), {
      message: "PDF must be 50 MB or less",
    })
    .refine((val) => (val instanceof File ? val.type === "application/pdf" : true), {
      message: "Only PDF files are allowed",
    }),
  year: z
    .string()
    .regex(/^\d{4}$/, { message: "Enter a valid year in YYYY format" }),
  month: z
    .string()
    .refine(
      (val) =>
        [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].includes(val),
      { message: "Enter a valid month name" }
    ),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional().or(z.literal("")),
  // mention: z.array(z.object({
  //   value: z.string(),
  //   label: z.string(),
  //   disable: z.boolean().optional(),
  //   fixed: z.boolean().optional(),
  // })).optional(),
  // is_featured: z.literal(0).or(z.literal(1)),
})

export const UploadVideoTextSchema = z.object({
  // Author Details
  full_academic_name: z.string().min(1, { message: "Full academic name is required" }),
  academic_title: z.string().min(1, { message: "Academic title is required" }),
  given_names: z.string().min(1, { message: "Given name(s) are required" }),
  orcid: z
    .string()
    .min(1, { message: "ORCID is required" }),
  professional_email: z.string()
    .trim()
    .min(1, { message: "Professional Email is required" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Enter a valid Email",
    }),
  department: z.string().min(1, { message: "Department is required" }),
  institution: z.string().min(1, { message: "Institution is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  city: z.string().min(1, { message: "City is required" }),
  corresponding_author: z.enum(["yes", "no"] as const),
  correspondence_address: z.string().min(1, { message: "Correspondence address is required" }),
  research_interests: z.string().min(1, { message: "Research interests are required" }),

  // Contribution roles
  conceptualisation: z.string().min(1, { message: "Conceptualisation is required" }),
  surgical_procedure_and_video: z.string().min(1, { message: "Surgical Procedure and Video is required" }),
  abstract_preparation: z.string().min(1, { message: "Abstract Preparation is required" }),
  editing_and_narration: z.string().min(1, { message: "Editing and Narration is required" }),
  final_approval: z.string().min(1, { message: "Final Approval is required" }),

  // Acknowledgements
  acknowledgements: z.string().optional().or(z.literal("")),

  // Declarations (choose one)
  declarations: z.enum([
    "Informed consent obtained from the patient(s) or legal guardian(s) for use of clinical materials, images, and video",
    "Not applicable (no identifiable patient data).",
  ] as const),

  // Institutional / Ethical approval (choose one)
  ethical_approval_institution: z.enum([
    "Approval granted by ___________ (institutional review board / equivalent)",
    "Not applicable for educational content / anonymised retrospective case",
  ] as const),
})

type UploadVideoFields = z.infer<typeof UploadVideoSchema>
type UploadVideoTextFields = z.infer<typeof UploadVideoTextSchema>

export type { UploadVideoFields, UploadVideoTextFields };

