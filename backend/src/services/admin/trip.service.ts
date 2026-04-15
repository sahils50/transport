import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

// List all trips page along with delayed trips
export const getAllTrips = async (
  admin_id: number,
  page: number,
  limit: number,
  status: any,
) => {
  const skip = (page - 1) * limit;
  const [trips, totalCount] = await Promise.all([
    prisma.trip.findMany({
      where: { admin_id, trip_status: status || undefined, is_active: true },
      skip,
      take: limit,
      orderBy: { scheduled_start_at: "desc" },
      select: {
        trip_id: true,
        trip_code: true,
        trip_name: true,
        origin_name: true,
        destination_name: true,
        trip_status: true,
        fuel_limit: true,
        toll_limit: true,
        other_cost_limit: true,
        scheduled_start_at: true,
        vehicle: {
          select: {
            vehicle_number: true,
          },
        },
        driver: {
          select: {
            driver_name: true,
          },
        },
      },
    }),
    prisma.trip.count({
      where: { admin_id, trip_status: status || undefined, is_active: true },
    }),
  ]);
  const formattedTrips = trips.map((trip) => ({
    ...trip,
    total_allocated_budget:
      trip.fuel_limit + trip.toll_limit + trip.other_cost_limit,
  }));
  return {
    trips: formattedTrips,
    pagination: {
      total_records: totalCount,
      current_page: page,
      total_pages: Math.ceil(totalCount / limit),
    },
  };
};
export const postTrip = async (admin_id: number, data: any) => {
  const existingTrip = await prisma.trip.findUnique({
    where: { trip_code: data.trip_code },
  });
  if (existingTrip) {
    throw new AppError("Trip code already exist", 400);
  }
  const [vehicle, driver] = await Promise.all([
    prisma.vehicle.findFirst({
      where: { vehicle_id: data.vehicle_id, admin_id },
    }),
    prisma.driver.findFirst({ where: { driver_id: data.driver_id, admin_id } }),
  ]);
  if (!vehicle || !driver) {
    throw new AppError("Invalid Vehicle or Driver Selection", 400);
  }
  const formatForMySQL = (date: Date) =>
    date.toISOString().slice(0, 19).replace("T", " ");

  const startAt = formatForMySQL(new Date(data.scheduled_start_at));
  const endAt = formatForMySQL(new Date(data.scheduled_end_at));
  await prisma.$executeRaw`
    INSERT INTO trip (
      admin_id, trip_code, trip_name, vehicle_id, driver_id, 
      origin_name, destination_name, origin_coordinates, destination_coordinates, 
      scheduled_start_at, scheduled_end_at, trip_type, trip_status, 
      fuel_limit, toll_limit, other_cost_limit, notes
    ) VALUES (
      ${admin_id}, 
      ${data.trip_code}, 
      ${data.trip_name}, 
      ${data.vehicle_id}, 
      ${data.driver_id}, 
      ${data.origin_name}, 
      ${data.destination_name}, 
      POINT(${data.origin_coordinates.x}, ${data.origin_coordinates.y}), 
      POINT(${data.destination_coordinates.x}, ${data.destination_coordinates.y}), 
      ${startAt}, 
      ${endAt}, 
      ${data.trip_type}, 
      ${data.trip_status || "scheduled"}, 
      ${data.fuel_limit || 0}, 
      ${data.toll_limit || 0}, 
      ${data.other_cost_limit || 0}, 
      ${data.notes || null}
    )
  `;
  return { message: "Trip created successfully", trip_code: data.trip_code };
};
