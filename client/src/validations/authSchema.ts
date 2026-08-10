import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),

  // Deliberately does NOT include "principal" — self-registration should
  // never be able to create an admin account. Keep this list in sync with
  // whatever the server's registerUser controller actually allows.
  role: z.enum(["teacher", "hod", "admission_staff"], {
    message: "Please select a role",
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
