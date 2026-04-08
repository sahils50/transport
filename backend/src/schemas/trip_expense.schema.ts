import { z } from "zod";

export const createExpenseSchema = z.object({
  body: z.object({
    admin_id: z.number().int(),
    driver_id: z.number().int(),
    trip_id: z.number().int(),
    expense_type: z.enum(["fuel", "toll", "other"]),
    expense_amount: z.number().positive(), // Decimal in Prisma, number in Zod
    payment_mode: z.enum(["cash", "online", "card", "upi"]),
    bill_url: z.string().url().nullable().optional(),
    notes: z.string().nullable().optional(),
    status: z.enum(["pending", "paid", "rejected"]).default("pending"),
    reviewed_by: z.number().int().nullable().optional(),
  }),
});
