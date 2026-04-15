import { prisma } from "../config/prisma";

const generateCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // e.g. "A3F9KL"
};

export const generateUniqueBusinessCode = async (): Promise<string> => {
  let code: string;
  let exists: boolean;

  do {
    code = generateCode();
    const admin = await prisma.admin.findUnique({
      where: { business_code: code },
      select: { admin_id: true },
    });
    exists = !!admin;
  } while (exists);

  return code;
};
