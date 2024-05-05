import { z } from "zod";

export const logInFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LogInInputType = z.infer<typeof logInFormSchema>;
