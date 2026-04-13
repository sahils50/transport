import { z } from "zod";
export const createVehicleSchema = z.object({
  body: z.object({
    // Make admin_id optional here since we get it from the token
    admin_id: z.number().int().optional(),
    vehicle_number: z.string().max(20),
    vehicle_type: z.enum([
      "truck",
      "car",
      "bike",
      "rickshaw",
      "van",
      "bus",
      "tempo",
    ]),
    fuel_type: z.enum(["petrol", "diesel", "CNG", "electric"]),
    mileage: z.number().int().nonnegative(),
    fuel_tank_capacity: z.number().int().positive(),
    is_active: z.boolean().default(true),
  }),
});

// Extract the type for the Request Body
export type CreateVehicleInput = z.infer<typeof createVehicleSchema>["body"];

export const getVehiclesQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().default("1"),
    limit: z.string().optional().default("10"),
    type: z
      .enum(["truck", "car", "bike", "rickshaw", "van", "bus", "tempo"])
      .optional(),
    is_active: z.enum(["true", "false"]).optional(),
  }),
});

export type GetVehiclesQueryInput = z.infer<
  typeof getVehiclesQuerySchema
>["query"];

export const updateVehicleSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val)), // The vehicle_id from URL
  }),
  body: z.object({
    vehicle_number: z.string().max(20).optional(),
    vehicle_type: z
      .enum(["truck", "car", "bike", "rickshaw", "van", "bus", "tempo"])
      .optional(),
    fuel_type: z.enum(["petrol", "diesel", "CNG", "electric"]).optional(),
    mileage: z.number().int().nonnegative().optional(),
    fuel_tank_capacity: z.number().int().positive().optional(),
    is_active: z.boolean().optional(),
  }),
});

export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>["body"];
