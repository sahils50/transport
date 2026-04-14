import { Request, Response, NextFunction } from "express";
import { loginDriver } from "../services/driver/auth.service";
import { AppError } from "../utils/AppError";
import { getDriverProfile } from "../services/driver/driver.service";
import { getOwnerDetail } from "../services/driver/owner.service";
import {
  getDriverExpenses,
  getExpenseById,
  postNewExpense,
} from "../services/driver/expense.service";
import { PostExpenseInput } from "../schemas/trip_expense.schema";

export const handleDriverLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await loginDriver(req.body);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const driverId = req.driver!.driver_id;
    const profile = await getDriverProfile(driverId);
    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetAdminContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.driver) return next(new AppError("Unauthorized", 401));
    const admin_id = req.driver.admin_id;
    const adminContact = await getOwnerDetail(admin_id);
    return res.status(200).json({
      success: true,
      message: "Admin contact fetched successfully",
      data: adminContact,
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetExpenseFeed = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const driver_id = req.driver!.driver_id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const status = req.query.status as string;

    const result = await getDriverExpenses(driver_id, page, limit, status);

    return res.status(200).json({
      success: true,
      data: result.expenses,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetExpenseDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const driver_id = req.driver!.driver_id;
    const expense_id = Number(req.params.id);

    const expense = await getExpenseById(expense_id, driver_id);

    return res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (err) {
    next(err);
  }
};

export const handlePostExpense = async (
  req: Request<{}, {}, PostExpenseInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    // These are coming from your authenticateDriver middleware
    const driver_id = req.driver!.driver_id;
    const admin_id = req.driver!.admin_id;

    const expense = await postNewExpense(driver_id, admin_id, req.body);

    return res.status(201).json({
      success: true,
      message: "Expense logged successfully and sent for approval",
      data: expense,
    });
  } catch (err) {
    next(err);
  }
};
