import { prisma } from "../../config/prisma";
import {
  CreateVehicleInput,
  UpdateVehicleInput,
} from "../../schemas/vehicle.schema";
import { AppError } from "../../utils/AppError";

// List all vehicles page & Create Trip page
export const getAllVehicles = async (
  admin_id: number,
  page: number,
  limit: number,
  filters: { type?: any; is_active?: string },
) => {
  const skip = (page - 1) * limit;
  const isActiveBool =
    filters.is_active === "true"
      ? true
      : filters.is_active === "false"
        ? false
        : undefined;
  const [vehicles, totalCount] = await Promise.all([
    prisma.vehicle.findMany({
      where: {
        admin_id,
        vehicle_type: filters.type || undefined,
        is_active: isActiveBool ?? undefined,
      },
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      include: {
        _count: {
          select: { trip: true },
        },
      },
    }),
    prisma.vehicle.count({
      where: {
        admin_id,
        vehicle_type: filters.type || undefined,
        is_active: isActiveBool ?? undefined,
      },
    }),
  ]);
  return {
    vehicles,
    pagination: {
      total_records: totalCount,
      current_page: page,
      total_pages: Math.ceil(totalCount / limit),
    },
  };
};
export const postNewVehicle = async (
  admin_id: number,
  data: CreateVehicleInput,
) => {
  const existingVehicle = await prisma.vehicle.findFirst({
    where: {
      vehicle_number: data.vehicle_number,
      is_active: true,
    },
  });
  if (existingVehicle)
    throw new AppError(
      "A vehicle with this registration number already exists",
      400,
    );
  const newVehicle = await prisma.vehicle.create({
    data: {
      admin_id: admin_id,
      vehicle_number: data.vehicle_number,
      vehicle_type: data.vehicle_type,
      fuel_type: data.fuel_type,
      mileage: data.mileage,
      fuel_tank_capacity: data.fuel_tank_capacity,
      is_active: data.is_active ?? true,
    },
  });
  return newVehicle;
};
export const updateVehicleInfo = async (
  vehicle_id: number,
  admin_id: number,
  data: UpdateVehicleInput,
) => {
  // 1. Ensure the vehicle exists and belongs to this admin
  const vehicle = await prisma.vehicle.findFirst({
    where: { vehicle_id, admin_id },
  });

  if (!vehicle) {
    throw new AppError("Vehicle not found or access denied", 404);
  }

  // 2. If changing vehicle number, check if the new number is already taken
  if (data.vehicle_number && data.vehicle_number !== vehicle.vehicle_number) {
    const duplicate = await prisma.vehicle.findFirst({
      where: { vehicle_number: data.vehicle_number, is_active: true },
    });
    if (duplicate)
      throw new AppError("Vehicle number already exists in system", 400);
  }

  // 3. Update the record
  return await prisma.vehicle.update({
    where: { vehicle_id },
    data: data, // Only fields present in the body will be updated
  });
};
