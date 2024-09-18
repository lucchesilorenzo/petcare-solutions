import { z } from "zod";
import { PET_DEFAULT_IMAGE } from "./constants";

export const petIdSchema = z.string().cuid();

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required.")
      .max(20, "Name is too long."),
    owner: z
      .string()
      .trim()
      .min(1, "Owner name is required.")
      .max(20, "Owner name is too long."),
    imageUrl: z.string().trim().url("Invalid image URL.").or(z.literal("")),
    age: z.coerce
      .number({
        invalid_type_error: "Age must be a number.",
      })
      .int()
      .positive("Age must be a positive number.")
      .min(1, "Age is required.")
      .max(100, "Age is too large."),
    notes: z.string().trim().max(100, "Notes is too long.").or(z.literal("")),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || PET_DEFAULT_IMAGE,
  }));

export type TPetFormSchema = z.infer<typeof petFormSchema>;

export const authFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email address."),
  password: z
    .string()
    .trim()
    .min(1, "Password is required.")
    .max(20, "Password is too long."),
});

export type TAuthFormSchema = z.infer<typeof authFormSchema>;
