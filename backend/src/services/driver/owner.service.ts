import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

export const getOwnerDetail = async (admin_id: number) => {
  const adminDetail = await prisma.admin.findFirst({
    where: {
      admin_id,
      is_active: true,
    },
    select: {
      admin_id: true,
      email_address: true,
      phone_no: true,
      is_active: true,
    },
  });
  if (!admin_id) throw new AppError("Admin not found", 404);
  return adminDetail;
};
