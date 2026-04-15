import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { ReviewExpenseInput } from "../../schemas/trip_expense.schema";
// List All expense page
export const getAllExpenseDetails = async (
  admin_id: number,
  page: number,
  limit: number,
  status?: any,
) => {
  const skip = (page - 1) * limit;

  const [expenses, totalCount] = await Promise.all([
    prisma.trip_expense.findMany({
      where: { admin_id, status: status || undefined, is_active: true },
      skip: skip,
      take: limit,
      orderBy: { created_at: "desc" },
      select: {
        expense_id: true,
        expense_type: true,
        expense_amount: true,
        payment_mode: true,
        status: true,
        created_at: true,
        bill_url: true,
        driver: {
          select: { driver_name: true, driver_license_no: true },
        },
        trip: {
          select: {
            trip_name: true,
            trip_code: true,
          },
        },
      },
    }),
    prisma.trip_expense.count({
      where: { admin_id, status: status || undefined, is_active: true },
    }),
  ]);
  return {
    expenses,
    pagination: {
      total_records: totalCount,
      current_page: page,
      total_pages: Math.ceil(totalCount / limit),
      has_more: skip + expenses.length < totalCount,
    },
  };
};
//TODO: List Expense by id || Implement it when we make independence detailed page for each expense
export const getExpenseDetailByTripID = async () => {};
export const postApproveExpenseByID = async (
  admin_id: number,
  data: ReviewExpenseInput,
) => {
  const expense = await prisma.trip_expense.findFirst({
    where: { expense_id: data.expense_id, admin_id: admin_id },
  });
  if (!expense) {
    throw new AppError("Expense record not found or access denied", 404);
  }
  if (expense.status !== "pending") {
    throw new AppError(
      `This expense has already been marked as ${expense.status}`,
      400,
    );
  }
  return await prisma.trip_expense.update({
    where: { expense_id: data.expense_id },
    data: {
      status: data.status,
      notes: data.notes || expense.notes,
      reviewed_by: admin_id,
      reviewed_at: new Date(),
    },
    include: {
      driver: { select: { driver_name: true } },
      trip: { select: { trip_name: true } },
    },
  });
};
