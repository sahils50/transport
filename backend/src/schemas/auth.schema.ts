import { z } from "zod";
import { createAdminSchema } from "./admin.schema";

export const loginAdminSchema = z.object({
  body: z.object({
    email_address: z.email({ message: "Invalid email format" }),
    password: z.string().min(1, { message: "Password is required" }),
  }),
});

export type LoginAdminInput = z.infer<typeof loginAdminSchema>["body"];
export type CreateAdminInput = z.infer<typeof createAdminSchema>["body"];
