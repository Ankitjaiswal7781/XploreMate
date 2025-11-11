import { z } from "zod";

export const userSignupSchema = z.object({
  fullname: z.string().min(1, "Fullname is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters."),
  contact: z
    .string()
    .min(10, { message: "Contact number must at least 10 digits" })
    .max(10, "Contact number must at most 10 digits"),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;
