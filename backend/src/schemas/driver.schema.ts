import * as z from "zod";

export const createDriverSchema = z.object({
  body: z.object({
    admin_id: z.number().int(),
    driver_name: z.string().min(2),
    driver_phone_no1: z.string().min(10),
    driver_phone_no2: z.string().optional(),
    driver_license_no: z.string().min(5),
    driver_license_type: z.string(),
    driver_license_expiry_date: z.preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
      return arg;
    }, z.date()),
  }),
});
export type CreateDriverInput = z.infer<typeof createDriverSchema>["body"];

export const driverLoginSchema = z.object({
  body: z.object({
    driver_phone_no1: z.string().min(10),
    business_code: z.string().min(6), // From the Admin's business_code
  }),
});

export type DriverLoginInput = z.infer<typeof driverLoginSchema>["body"];
