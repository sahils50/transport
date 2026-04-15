import { z } from "zod";

export const dashboardFilterSchema = z.object({
  query: z.object({
    expense_period: z.enum(["today", "weekly", "monthly"]).default("monthly"),
  }),
});

export type DashboardFilterInput = z.infer<
  typeof dashboardFilterSchema
>["query"];
