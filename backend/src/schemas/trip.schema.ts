import { z } from "zod";

export const createTripSchema = z.object({
  body: z.object({
    trip_code: z.string().max(20),
    trip_name: z.string().max(200),
    vehicle_id: z.number().int(),
    driver_id: z.number().int(),
    origin_name: z.string().max(255),
    destination_name: z.string().max(255),
    origin_coordinates: z.object({
      x: z.number(),
      y: z.number(),
    }),
    destination_coordinates: z.object({
      x: z.number(),
      y: z.number(),
    }),
    scheduled_start_at: z.coerce.date(),
    scheduled_end_at: z.coerce.date(),
    trip_type: z.enum(["single", "return"]),
    trip_status: z
      .enum(["scheduled", "in_transit", "completed", "cancelled", "delayed"])
      .default("scheduled"),
    fuel_limit: z.number().int().default(0),
    toll_limit: z.number().int().default(0),
    other_cost_limit: z.number().int().default(0),
    notes: z.string().nullable().optional(),
    cancellation_reason: z.string().nullable().optional(),
    actual_start_at: z.coerce.date().nullable().optional(),
    actual_end_at: z.coerce.date().nullable().optional(),
  }),
});

export const getTripsQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().default("1"),
    limit: z.string().optional().default("10"),
    status: z
      .enum(["scheduled", "in_transit", "completed", "cancelled", "delayed"])
      .optional(),
  }),
});

export type GetTripsQueryInput = z.infer<typeof getTripsQuerySchema>["query"];
