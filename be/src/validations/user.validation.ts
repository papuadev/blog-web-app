import { z } from "zod";

const field = {
  name: z.string().min(1, "Name is required"),
  email: z
    .string({ error: "Email is required" })
    .check(z.email({ error: "Invalid email format" })),
  password: z
    .string({ error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
};

export const updateUserSchema = z.object({
  name: field.name,
});
