import { z } from "zod"

export const submissionFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?\d+$/, "Phone number must be valid"),
  age: z
    .string()
    .min(1, "Age is required")
    .regex(/^\d+$/, "Age must be a number"),
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  file: z
    .any()
    .refine((file) => file instanceof File || file === null, "Please upload a valid file"),
  preferredMode: z.object({
    onsite: z.boolean().optional(),
    remote: z.boolean().optional(),
    hybrid: z.boolean().optional(),
  })
})
