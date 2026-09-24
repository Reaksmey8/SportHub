import { z } from "zod";

const email = z
  .string()
  .trim()
  .email("Please enter a valid email address.");

const password = z
  .string()
  .min(6, "Password must be at least 6 characters.");

export const loginSchema = z.object({
  email,
  password,
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter a name with at least 2 characters."),
  email,
  password,
});
