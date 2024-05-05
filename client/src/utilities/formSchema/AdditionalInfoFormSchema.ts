import { z } from "zod";

export const AdditionalInfoSchema = z.object({
  username: z.string().min(3, { message: "At least 3 characters" }).max(50),
  name: z.string().min(3, { message: "At least 3 characters" }).max(50),
  profession: z.string().min(6, { message: "At least 6 characters" }).max(50),
  bio: z.string().min(16, { message: "At least 16 characters" }).max(300),
  gender: z.enum(["Male", "Female", "Other"]),
  educationLevel: z.enum([
    "High School",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate Degree",
    "Other",
  ]),
  phoneNumber: z.string().regex(/^\+?\d{1,3}[- ]?\d{3,14}$/), // Add phone number field with regex validation
});

export type AdditionalInfoInputType = z.infer<typeof AdditionalInfoSchema>;
