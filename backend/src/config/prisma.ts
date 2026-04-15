import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { env } from "./env";

const adapter = new PrismaMariaDb({
  host: env.DATABASE_HOST ?? "localhost",
  port: env.DATABASE_PORT ? parseInt(env.DATABASE_PORT) : 3306,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD || undefined,
  database: env.DATABASE_NAME,
  connectionLimit: 10,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
