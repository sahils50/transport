import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

//List all driver page & Create Trip page
export const getAllActiveDrivers = async (admin_id: number) => {
  const drivers = await prisma.driver.findMany({
    where: { admin_id, is_active: true },
    select: {
      driver_id: true,
      driver_name: true,
      driver_phone_no1: true,
      driver_phone_no2: true,
      driver_license_no: true,
      driver_license_type: true,
      driver_license_expiry_date: true,
      driver_profile_picture_url: true,
      is_active: true,
      created_at: true,
    },
  });
  if (!admin_id) throw new AppError("Admin not found", 404);
  return drivers;
};

export const postNewDriver = async () => {};

export const getDriverInfoById = async () => {};
