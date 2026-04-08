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
