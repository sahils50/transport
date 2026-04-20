import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { CreateDriverInput } from "../../schemas/driver.schema";

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

export const postNewDriver = async (
  admin_id: number,
  data: CreateDriverInput,
) => {
  const existingDriver = await prisma.driver.findFirst({
    where: {
      OR: [
        { driver_phone_no1: data.driver_phone_no1 },
        { driver_license_no: data.driver_license_no },
      ],
    },
  });
  if (existingDriver) {
    const conflictField =
      existingDriver.driver_phone_no1 === data.driver_phone_no1
        ? "Phone number"
        : "Licence number";
    throw new AppError(`${conflictField} is already registered`, 409);
  }
  return await prisma.driver.create({
    data: {
      admin_id: admin_id,
      driver_name: data.driver_name,
      driver_phone_no1: data.driver_phone_no1,
      driver_phone_no2: data.driver_phone_no2,
      driver_license_no: data.driver_license_no,
      driver_license_type: data.driver_license_type,
      driver_license_expiry_date: data.driver_license_expiry_date,
    },
  });
};

export const getDriverInfoById = async (
  driver_id: number,
  admin_id: number,
) => {
  const driver = await prisma.driver.findFirst({
    where: {
      driver_id,
      admin_id,
      is_active: true,
    },
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
      updated_at: true,
      _count: {
        select: { trip: true },
      },
    },
  });
  if (!driver) {
    throw new AppError("Driver profile not found or access denied", 404);
  }
  return driver;
};
