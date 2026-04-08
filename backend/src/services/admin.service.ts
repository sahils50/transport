import { prisma } from "../config/prisma";
import { comparePassword } from "../utils/bcrypt.util";
import { signToken } from "../utils/jwt.util";
import type { LoginAdminInput } from "../schemas/auth.schema";
import { AppError } from "../utils/AppError";

export const loginAdmin = async (data: LoginAdminInput) => {
  const { email_address, password } = data;

  const admin = await prisma.admin.findUnique({
    where: { email_address },
    select: {
      admin_id: true,
      email_address: true,
      password: true,
      is_active: true,
      business_name: true,
    },
  });

  if (!admin) throw new AppError("Invalid email or password", 401);
  if (!admin.is_active) throw new AppError("Account is inactive", 403);
  if (!admin.password)
    throw new AppError("Password not configured for this account", 403);

  const isMatch = await comparePassword(password, admin.password);
  if (!isMatch) throw new AppError("Invalid email or password", 401);

  const token = signToken({
    admin_id: admin.admin_id,
    email_address: admin.email_address,
  });

  return {
    token,
    admin: {
      admin_id: admin.admin_id,
      email_address: admin.email_address,
      business_name: admin.business_name,
    },
  };
};
