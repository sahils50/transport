import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST ?? "localhost",
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.admin.createMany({
    data: [
      {
        email_address: "admin@transport.com",
        password:
          "$2a$12$GwyWk8vZhWy998kvRH2hbO3EZzW5qZWkO5kvh7HmadM9VV6r8kjXG",
        business_name: "Transport Co",
        business_code: "A83T50",
        phone_no: "9876543210",
        is_active: true,
      },
      {
        email_address: "admin2@transport.com",
        password:
          "$2a$12$GwyWk8vZhWy998kvRH2hbO3EZzW5qZWkO5kvh7HmadM9VV6r8kjXG",
        business_name: "Logistics Ltd",
        business_code: "B92K31",
        phone_no: "9123456789",
        is_active: true,
      },
    ],
  });

  await prisma.driver.createMany({
    data: [
      {
        admin_id: 1,
        driver_name: "John Doe",
        driver_phone_no1: "9876543210",
        driver_phone_no2: "9123456789",
        driver_license_no: "MH1234567890",
        driver_license_type: "HMV",
        driver_license_expiry_date: new Date("2027-12-31"),
        is_active: true,
      },
      {
        admin_id: 1,
        driver_name: "Jane Smith",
        driver_phone_no1: "9000000001",
        driver_phone_no2: null,
        driver_license_no: "MH9876543210",
        driver_license_type: "LMV",
        driver_license_expiry_date: new Date("2026-06-30"),
        is_active: true,
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
