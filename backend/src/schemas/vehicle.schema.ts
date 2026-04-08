import { z } from "zod";
export const createVehicleSchema = z.object({
  body: z.object({
    admin_id: z.number().int(),
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
