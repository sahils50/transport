import { prisma } from "../../config/prisma";
import { DriverLoginInput } from "../../schemas/driver.schema";
import { AppError } from "../../utils/AppError";
import { signToken } from "../../utils/jwt.util";

export const loginDriver = async (data: DriverLoginInput) => {
  const { driver_phone_no1, business_code } = data;
  const driver = await prisma.driver.findFirst({
    where: {
      driver_phone_no1,
      admin: { business_code },
    },
    select: {
      driver_id: true,
      driver_name: true,
      admin_id: true,
      is_active: true,
    },
  });
  if (!driver) throw new AppError("Invalid credentials", 401);
  if (!driver.is_active) throw new AppError("Account inactive", 403);
  const token = signToken({
    driver_id: driver.driver_id,
    admin_id: driver.admin_id,
    role: "driver",
  });
  return {
    token,
    driver: {
      driver_id: driver.driver_id,
      driver_name: driver.driver_name,
    },
  };
};
