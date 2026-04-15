import bcrypt from "bcrypt";

const SALT_ROUND = 10;

export const hashPassword = (plain: string): Promise<string> =>
  bcrypt.hash(plain, SALT_ROUND);

export const comparePassword = (
  plain: string,
  hashed: string,
): Promise<boolean> => bcrypt.compare(plain, hashed);
