import { z } from "zod";
import { UserRole } from "../models/User";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email(),
  password: z
    .string()
    .min(6),
  role: z.enum([
    "candidate",
    "employer"
  ]).transform((role) => role as UserRole.CANDIDATE | UserRole.EMPLOYER)
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email(),
  password: z
    .string()
    .min(6)
});

export type RegisterInput = z.infer<typeof registerSchema>;
