import { z } from "zod";

const email = z
  .string()
  .trim()
  .email("Please enter a valid email address.");

const loginPassword = z
  .string()
  .min(6, "Password must be at least 6 characters.");

const strongPassword = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[a-z]/, "Password must include at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
  .regex(/\d/, "Password must include at least one number.")
  .regex(
    /[^A-Za-z0-9\s]/,
    "Password must include at least one special character."
  );

export const loginSchema = z.object({
  email,
  password: loginPassword,
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter a name with at least 2 characters."),
  email,
  password: strongPassword,
});
