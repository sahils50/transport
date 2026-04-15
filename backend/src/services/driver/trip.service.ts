import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

export const getCurrentTripDetail = async () => {};
export const postStartEndTrip = async () => {};
export const getLatestTrip = async (driver_id: number) => {
  // Find a trip that is either 'in_transit' (priority) or the next 'scheduled' one
  const trip = await prisma.trip.findFirst({
    where: {
      driver_id,
      trip_status: { in: ["in_transit", "scheduled"] },
    },
    orderBy: [
      { trip_status: "desc" }, // 'in_transit' comes before 'scheduled' alphabetically/logic-wise
      { scheduled_start_at: "asc" },
    ],
    include: {
      vehicle: {
        select: { vehicle_number: true, vehicle_type: true },
      },
      // Calculate total expenses made for this trip
      _count: {
        select: { trip_expense: true },
      },
      trip_expense: {
        select: { expense_amount: true },
      },
    },
  });

  if (!trip) return null;

  // Calculate total spent so far
  const total_spent = trip.trip_expense.reduce(
    (sum, exp) => sum + Number(exp.expense_amount),
    0,
  );
  const allowed_budget =
    Number(trip.fuel_limit) +
    Number(trip.toll_limit) +
    Number(trip.other_cost_limit);

  return {
    trip_id: trip.trip_id,
    trip_code: trip.trip_code,
    trip_status: trip.trip_status,
    origin: trip.origin_name,
    destination: trip.destination_name,
    scheduled_start: trip.scheduled_start_at,
    actual_start: trip.actual_start_at,
    actual_end: trip.actual_end_at,
    vehicle: trip.vehicle,
    budget: {
      allowed: allowed_budget,
      spent: total_spent,
      remaining: allowed_budget - total_spent,
    },
  };
};

export const updateTripProgress = async (
  driver_id: number,
  trip_id: number,
  action: "start" | "end",
) => {
  const trip = await prisma.trip.findFirst({
    where: { trip_id, driver_id },
  });

  if (!trip) throw new AppError("Trip not found", 404);

  if (action === "start") {
    return await prisma.trip.update({
      where: { trip_id },
      data: {
        trip_status: "in_transit",
        actual_start_at: new Date(),
      },
    });
  } else {
    return await prisma.trip.update({
      where: { trip_id },
      data: {
        trip_status: "completed",
        actual_end_at: new Date(),
      },
    });
  }
};
