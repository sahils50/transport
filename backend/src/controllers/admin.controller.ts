import { Request, Response, NextFunction } from "express";
import { CreateAdminInput, LoginAdminInput } from "../schemas/auth.schema";
import { loginAdmin, createAdmin } from "../services/admin/auth.service";
import { AppError } from "../utils/AppError";
import { getAllActiveDrivers } from "../services/admin/driver.service";

export const loginAdminController = async (
  req: Request<{}, {}, LoginAdminInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await loginAdmin(req.body);
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const getDrivers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.admin) return next(new AppError("Unauthorized", 401));
    const admin_id = req.admin.admin_id;
    const drivers = await getAllActiveDrivers(admin_id);
    return res.status(200).json({
      success: true,
      message: "Drivers fetched successfully",
      data: drivers,
    });
  } catch (err) {
    next(err);
  }
};

export const createAdminController = async (
  req: Request<{}, {}, CreateAdminInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin = await createAdmin(req.body);
    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (err) {
    next(err);
  }
};
