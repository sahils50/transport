import { z } from "zod";

export const createAdminSchema = z.object({
  body: z.object({
    email_address: z.email({ error: "Invalid email format" }),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" }),
    business_name: z.string().max(200).optional(),
    business_code: z
      .string()
      .length(6, { error: "Business code must be 6 chars" })
      .optional(),
    phone_no: z
      .string()
      .min(10, { error: "Phone number must be at least 10 characters" })
      .max(20, { error: "Phone number must be at most 20 characters" }),
  }),
});

export const updateAdminSchema = z.object({
  body: z.object({
    admin_name: z.string().min(2).optional(),
    business_name: z.string().max(200).optional(),
    phone_no: z.string().min(10).max(20).optional(),
    profile_picture_url: z.string().url().optional().or(z.literal("")),
  }),
});

export type UpdateAdminInput = z.infer<typeof updateAdminSchema>["body"];

export const changePasswordSchema = z.object({
  body: z.object({
    old_password: z.string().min(1, "Old password is required"),
    new_password: z
      .string()
      .min(8, "New password must be at least 8 characters"),
  }),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>["body"];
