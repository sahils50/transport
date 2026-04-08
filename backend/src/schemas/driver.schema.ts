import * as z from "zod";

export const createDriverSchema = z.object({
  body: z.object({
    admin_id: z.number().int(),

    driver_name: z
      .string()
      .min(2, { error: "Driver name should be at least 2 characters" }),

    driver_phone_no1: z
      .string()
      .min(10, { error: "Phone number must be at least 10 characters" })
      .max(20, { error: "Phone number must be at most 20 characters" }),

    driver_phone_no2: z
      .string()
      .min(10, { error: "Phone number must be at least 10 characters" })
      .max(20, { error: "Phone number must be at most 20 characters" })
      .optional(),

    driver_license_expiry_date: z
      .preprocess((arg) => {
        if (arg === undefined || arg === null || arg === "") return undefined;
        if (typeof arg === "string" || arg instanceof Date)
          return new Date(arg);
        return arg;
      }, z.date())
      .optional(),
  }),
});
