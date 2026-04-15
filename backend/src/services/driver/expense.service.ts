import { prisma } from "../../config/prisma";
import { PostExpenseInput } from "../../schemas/trip_expense.schema";
import { AppError } from "../../utils/AppError";

export const getDriverExpenses = async (
  driver_id: number,
  page: number,
  limit: number,
  status?: string,
) => {
  const skip = (page - 1) * limit;

  const [expenses, totalCount] = await Promise.all([
    prisma.trip_expense.findMany({
      where: {
        driver_id,
        expense_status: status || undefined,
      },
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      include: {
        trip: {
          select: {
            trip_code: true,
            trip_name: true,
          },
        },
      },
    }),
    prisma.trip_expense.count({
      where: {
        driver_id,
        expense_status: status || undefined,
      },
    }),
  ]);

  return {
    expenses,
    pagination: {
      total_records: totalCount,
      current_page: page,
      total_pages: Math.ceil(totalCount / limit),
    },
  };
};
export const getExpenseById = async (expense_id: number, driver_id: number) => {
  const expense = await prisma.trip_expense.findFirst({
    where: {
      expense_id,
      driver_id,
    },
    include: {
      trip: true,
    },
  });

  if (!expense) {
    throw new AppError("Expense not found or unauthorized", 404);
  }

  return expense;
};
export const postNewExpense = async (
  driver_id: number,
  admin_id: number,
  data: PostExpenseInput,
) => {
  // 1. Verify the trip exists and belongs to this driver/admin
  const trip = await prisma.trip.findFirst({
    where: {
      trip_id: data.trip_id,
      driver_id: driver_id,
      admin_id: admin_id,
    },
  });

  if (!trip) {
    throw new AppError("Invalid trip selected or unauthorized access", 403);
  }

  // 2. Create the expense record
  const newExpense = await prisma.trip_expense.create({
    data: {
      trip_id: data.trip_id,
      driver_id: driver_id,
      admin_id: admin_id,
      expense_type: data.expense_type,
      expense_amount: data.expense_amount,
      payment_mode: data.payment_mode,
      bill_url: data.bill_url || null,
      notes: data.notes || null,
      status: "pending", // Force initial status
    },
  });

  return newExpense;
};
