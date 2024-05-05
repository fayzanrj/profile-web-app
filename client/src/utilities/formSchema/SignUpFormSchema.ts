import { z } from "zod";

export const SignUpFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Passwords does not match"),
});

export type SignUpInputType = z.infer<typeof SignUpFormSchema>;
