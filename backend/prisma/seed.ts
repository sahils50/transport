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
  console.log("Starting seed...");

  // 1. Seed Admins
  await prisma.admin.createMany({
    data: [
      {
        admin_id: 1,
        email_address: "admin@transport.com",
        admin_name: "Super Admin",
        password:
          "$2a$12$GwyWk8vZhWy998kvRH2hbO3EZzW5qZWkO5kvh7HmadM9VV6r8kjXG",
        business_name: "Transport Co",
        business_code: "A83T50",
        phone_no: "9876543210",
      },
      {
        admin_id: 2,
        email_address: "admin2@transport.com",
        admin_name: "Logistics Manager",
        password:
          "$2a$12$GwyWk8vZhWy998kvRH2hbO3EZzW5qZWkO5kvh7HmadM9VV6r8kjXG",
        business_name: "Logistics Ltd",
        business_code: "B92K31",
        phone_no: "9123456789",
      },
    ],
    skipDuplicates: true,
  });

  // 2. Seed Drivers
  await prisma.driver.createMany({
    data: [
      {
        driver_id: 1,
        admin_id: 1,
        driver_name: "John Doe",
        driver_phone_no1: "9876543210",
        driver_license_no: "MH1234567890",
        driver_license_type: "HMV",
        driver_license_expiry_date: new Date("2027-12-31"),
      },
      {
        driver_id: 2,
        admin_id: 2,
        driver_name: "Jane Smith",
        driver_phone_no1: "9000000001",
        driver_license_no: "MH9876543210",
        driver_license_type: "LMV",
        driver_license_expiry_date: new Date("2026-06-30"),
      },
    ],
    skipDuplicates: true,
  });

  // 3. Seed Vehicles
  await prisma.vehicle.createMany({
    data: [
      {
        vehicle_id: 1,
        admin_id: 1,
        vehicle_number: "MH-12-AB-1234",
        vehicle_type: "truck",
        fuel_type: "diesel",
        mileage: 15,
        fuel_tank_capacity: 100,
      },
      {
        vehicle_id: 2,
        admin_id: 2,
        vehicle_number: "MH-01-XY-9999",
        vehicle_type: "van",
        fuel_type: "petrol",
        mileage: 12,
        fuel_tank_capacity: 50,
      },
    ],
    skipDuplicates: true,
  });

  // 4. Seed Trips
  // Note: Using raw SQL for Point types if Prisma Unsupported doesn't handle objects well in your version
  // For this example, we use create to handle the Unsupported 'point' type more safely
  const tripData = [
    {
      trip_id: 1,
      admin_id: 1,
      driver_id: 1,
      vehicle_id: 1,
      trip_code: "TRP001",
      trip_name: "Mumbai to Pune",
      origin_name: "Mumbai",
      destination_name: "Pune",
      scheduled_start_at: new Date(),
      scheduled_end_at: new Date(Date.now() + 3600000 * 4),
      trip_type: "single",
      trip_status: "scheduled",
    },
    {
      trip_id: 2,
      admin_id: 2,
      driver_id: 2,
      vehicle_id: 2,
      trip_code: "TRP002",
      trip_name: "Delhi to Noida",
      origin_name: "Delhi",
      destination_name: "Noida",
      scheduled_start_at: new Date(),
      scheduled_end_at: new Date(Date.now() + 3600000 * 2),
      trip_type: "return",
      trip_status: "in_transit",
    },
  ];

  for (const t of tripData) {
    // We use executeRaw because 'Unsupported("point")' fields cannot be easily seeded via standard create
    await prisma.$executeRaw`
      INSERT INTO trip (trip_id, admin_id, trip_code, trip_name, vehicle_id, driver_id, origin_name, destination_name, origin_coordinates, destination_coordinates, scheduled_start_at, scheduled_end_at, trip_type, trip_status)
      VALUES (${t.trip_id}, ${t.admin_id}, ${t.trip_code}, ${t.trip_name}, ${t.vehicle_id}, ${t.driver_id}, ${t.origin_name}, ${t.destination_name}, POINT(19.0760, 72.8777), POINT(18.5204, 73.8567), ${t.scheduled_start_at}, ${t.scheduled_end_at}, ${t.trip_type}, ${t.trip_status})
      ON DUPLICATE KEY UPDATE trip_id=trip_id;
    `;
  }

  // 5. Seed Trip Expenses
  await prisma.trip_expense.createMany({
    data: [
      {
        admin_id: 1,
        driver_id: 1,
        trip_id: 1,
        expense_type: "fuel",
        expense_amount: 2500.5,
        payment_mode: "online",
        status: "pending",
      },
      {
        admin_id: 2,
        driver_id: 2,
        trip_id: 2,
        expense_type: "toll",
        expense_amount: 150.0,
        payment_mode: "cash",
        status: "paid",
        reviewed_by: 2,
        reviewed_at: new Date(),
      },
    ],
    skipDuplicates: true,
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
