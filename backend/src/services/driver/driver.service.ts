import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

export const getDriverProfile = async (driverId: number) => {
  const profile = await prisma.driver.findUnique({
    where: {
      driver_id: driverId,
    },
    select: {
      driver_id: true,
      admin_id: true,
      driver_name: true,
      driver_phone_no1: true,
      driver_phone_no2: true,
      driver_license_no: true,
      driver_license_expiry_date: true,
      driver_profile_picture_url: true,
      is_active: true,
      admin: {
        select: {
          business_name: true,
          business_code: true,
        },
      },
    },
  });

  if (!profile) {
    throw new AppError("Driver profile not found", 404);
  }

  return profile;
};
