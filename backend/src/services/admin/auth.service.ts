import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { comparePassword, hashPassword } from "../../utils/bcrypt.util";
import { signToken } from "../../utils/jwt.util";
import type { LoginAdminInput } from "../../schemas/auth.schema";
import { generateUniqueBusinessCode } from "../../utils/businessCode.util";
import { CreateAdminInput } from "../../schemas/auth.schema";
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

export const createAdmin = async (data: CreateAdminInput) => {
  const { email_address, password, business_name, phone_no } = data;

  const existing = await prisma.admin.findFirst({
    where: {
      OR: [{ email_address }, { phone_no }],
    },
    select: { email_address: true, phone_no: true },
  });

  if (existing?.email_address === email_address)
    throw new AppError("Email already registered", 409);

  if (existing?.phone_no === phone_no)
    throw new AppError("Phone number already registered", 409);

  const [hashedPassword, business_code] = await Promise.all([
    hashPassword(password),
    generateUniqueBusinessCode(),
  ]);

  const admin = await prisma.admin.create({
    data: {
      email_address,
      password: hashedPassword,
      business_name,
      phone_no,
      business_code,
    },
    select: {
      admin_id: true,
      email_address: true,
      business_name: true,
      business_code: true,
      phone_no: true,
      created_at: true,
    },
  });
  if (existing?.email_address === email_address)
    throw new AppError("Email already registered", 409);

  if (existing?.phone_no === phone_no)
    throw new AppError("Phone number already registered", 409);

  return admin;
};
