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

export const getExpensesQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 10)),
    status: z.enum(["pending", "paid", "rejected"]).optional(),
  }),
});

export type GetExpensesQueryInput = z.infer<
  typeof getExpensesQuerySchema
>["query"];

export const reviewExpenseSchema = z.object({
  body: z.object({
    expense_id: z.number().int(),
    status: z.enum(["paid", "rejected"]), // Admin can only move to paid or rejected
    notes: z.string().optional(),
  }),
});

export type ReviewExpenseInput = z.infer<typeof reviewExpenseSchema>["body"];
export const postExpenseSchema = z.object({
  body: z.object({
    trip_id: z.number().int(),
    expense_type: z.enum(["fuel", "toll", "other"]),
    expense_amount: z.number().positive(),
    payment_mode: z.enum(["cash", "online", "card", "upi"]),
    bill_url: z.url().nullable().optional(),
    notes: z.string().nullable().optional(),
    // admin_id and driver_id made optional to pass validation
    admin_id: z.number().int().optional(),
    driver_id: z.number().int().optional(),
  }),
});

export type PostExpenseInput = z.infer<typeof postExpenseSchema>["body"];
