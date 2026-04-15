import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3000"),
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.string().default("3306"),
  DATABASE_USER: z.string().min(1),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string().min(1),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  SERVER_PORT: z.string(),
  LOG_LEVEL: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  const flattened = z.flattenError(parsed.error);
  console.error(flattened.fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
