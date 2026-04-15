import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { UpdateAdminInput } from "../../schemas/admin.schema";
import { ChangePasswordInput } from "../../schemas/admin.schema";
import { hashPassword, comparePassword } from "../../utils/bcrypt.util";
import { endOfMonth, startOfDay, startOfMonth, startOfWeek } from "date-fns";

// List trip status, expenses, Performance on home page
export const getHomeStatus = async (
  admin_id: number,
  expense_period: string,
) => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  let expenseStartDate = monthStart;
  if (expense_period === "today") expenseStartDate = startOfDay(now);
  if (expense_period === "weekly") expenseStartDate = startOfWeek(now);

  const [
    activeTrips,
    delayedTrips,
    scheduledTrips,
    totalVehicles,
    vehichlesInTrips,
  ] = await Promise.all([
    prisma.trip.count({ where: { admin_id, trip_status: "in_transit" } }),
    prisma.trip.count({ where: { admin_id, trip_status: "delayed" } }),
    prisma.trip.count({ where: { admin_id, trip_status: "scheduled" } }),
    prisma.vehicle.count({ where: { admin_id, is_active: true } }),
    prisma.trip.findMany({
      where: { admin_id, trip_status: { in: ["in_transit", "delayed"] } },
      select: { vehicle_id: true },
    }),
  ]);
  const idleVehicles =
    totalVehicles - new Set(vehichlesInTrips.map((v) => v.vehicle_id)).size;
  const expenseAnalysis = await prisma.trip_expense.groupBy({
    by: ["expense_type"],
    where: { admin_id, created_at: { gte: expenseStartDate }, status: "paid" },
    _sum: { expense_amount: true },
  });
  const monthlyAggregates = await prisma.trip.aggregate({
    where: { admin_id, created_at: { gte: monthStart, lte: monthEnd } },
    _sum: {
      fuel_limit: true,
      toll_limit: true,
      other_cost_limit: true,
    },
    _count: { trip_id: true },
  });
  const actualMonthlyExpenses = await prisma.trip_expense.aggregate({
    where: {
      admin_id,
      created_at: { gte: monthStart, lte: monthEnd },
      status: "paid",
    },
    _sum: { expense_amount: true },
  });

  const expectedTotal =
    Number(monthlyAggregates._sum.fuel_limit || 0) +
    Number(monthlyAggregates._sum.other_cost_limit || 0) +
    Number(monthlyAggregates._sum.toll_limit || 0);
  return {
    overview: {
      active_trips: activeTrips,
      delayed_trips: delayedTrips,
      scheduled_trips: scheduledTrips,
      idle_vehicle: idleVehicles,
    },
    expense_analysis: {
      period: expense_period,
      fuel:
        expenseAnalysis.find((e) => e.expense_type === "fuel")?._sum
          .expense_amount || 0,
      toll:
        expenseAnalysis.find((e) => e.expense_type === "toll")?._sum
          .expense_amount || 0,
      other:
        expenseAnalysis.find((e) => e.expense_type === "other")?._sum
          .expense_amount || 0,
    },
    monthly_summary: {
      total_trips: monthlyAggregates._count.trip_id,
      expected_expense: expectedTotal,
      actual_expense: actualMonthlyExpenses._sum.expense_amount || 0,
    },
  };
};
// TODO:List detailed report page
export const getDetailedReport = async (admin_id: number) => {};
export const getProfileDetail = async (admin_id: number) => {
  const adminProfile = await prisma.admin.findUnique({
    where: { admin_id, is_active: true },
    select: {
      admin_id: true,
      email_address: true,
      admin_name: true,
      business_name: true,
      business_code: true,
      phone_no: true,
      profile_picture_url: true,
      is_active: true,
    },
  });
  if (!admin_id) throw new AppError("Admin not found", 404);
  return adminProfile;
};

export const putProfileDetail = async (
  admin_id: number,
  data: UpdateAdminInput,
) => {
  const admin = await prisma.admin.findUnique({
    where: { admin_id },
  });
  if (!admin) {
    throw new AppError("Admin not found", 404);
  }
  if (data.phone_no) {
    const existingPhone = await prisma.admin.findFirst({
      where: {
        phone_no: data.phone_no,
        NOT: { admin_id },
      },
    });
    if (existingPhone) {
      throw new AppError("Phone number already in use by another account", 409);
    }
  }
  return await prisma.admin.update({
    where: { admin_id },
    data: {
      admin_name: data.admin_name,
      business_name: data.business_name,
      phone_no: data.phone_no,
      profile_picture_url: data.profile_picture_url,
      updated_at: new Date(),
    },
    select: {
      admin_id: true,
      admin_name: true,
      email_address: true,
      business_name: true,
      business_code: true,
      phone_no: true,
      profile_picture_url: true,
    },
  });
};
export const updateAdminPassword = async (
  admin_id: number,
  data: ChangePasswordInput,
) => {
  const admin = await prisma.admin.findUnique({
    where: { admin_id },
    select: { password: true },
  });
  if (!admin || !admin.password) {
    throw new AppError("Admin not found or password not set", 404);
  }
  const isMatch = await comparePassword(data.old_password, admin.password);
  if (!isMatch) throw new AppError("Incorrect original password", 401);
  if (data.old_password === data.new_password) {
    throw new AppError(
      "New password cannot be the same as the old password",
      400,
    );
  }
  const newHashedPassword = await hashPassword(data.new_password);
  await prisma.admin.update({
    where: { admin_id },
    data: {
      password: newHashedPassword,
      updated_at: new Date(),
    },
  });
  return { message: "Password updated successfully" };
};
