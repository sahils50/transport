import { Request, Response, NextFunction } from "express";
import { CreateAdminInput, LoginAdminInput } from "../schemas/auth.schema";
import { loginAdmin, createAdmin } from "../services/admin/auth.service";
import { AppError } from "../utils/AppError";
import {
  getAllActiveDrivers,
  getDriverInfoById,
  postNewDriver,
} from "../services/admin/driver.service";
import {
  getProfileDetail,
  updateAdminPassword,
  putProfileDetail,
  getHomeStatus,
} from "../services/admin/admin.service";
import { CreateDriverInput } from "../schemas/driver.schema";
import { UpdateAdminInput } from "../schemas/admin.schema";
import { ChangePasswordInput } from "../schemas/admin.schema";
import { DashboardFilterInput } from "../schemas/dashboard.schema";
import {
  getAllExpenseDetails,
  postApproveExpenseByID,
} from "../services/admin/expense.service";
import { ReviewExpenseInput } from "../schemas/trip_expense.schema";
import { GetTripsQueryInput } from "../schemas/trip.schema";
import { getAllTrips, postTrip } from "../services/admin/trip.service";
import {
  GetVehiclesQueryInput,
  UpdateVehicleInput,
} from "../schemas/vehicle.schema";
import {
  getAllVehicles,
  postNewVehicle,
  updateVehicleInfo,
} from "../services/admin/vehicle.service";
import { CreateVehicleInput } from "../schemas/vehicle.schema";

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
export const getAdminProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.admin) return next(new AppError("Unauthorized", 401));
    const admin_id = req.admin.admin_id;
    const adminProfile = await getProfileDetail(admin_id);
    return res.status(200).json({
      success: true,
      message: "Admin profile fetched successfully",
      data: adminProfile,
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
export const createDriverController = async (
  req: Request<{}, {}, CreateDriverInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newDriver = await postNewDriver(req.body);
    return res.status(201).json({
      success: true,
      message: "Driver create successfully",
      data: newDriver,
    });
  } catch (err) {
    next(err);
  }
};
export const handleUpdateProfile = async (
  req: Request<{}, {}, UpdateAdminInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.admin) {
      throw new AppError("Unauthorized", 401);
    }
    const admin_id = req.admin.admin_id;
    const updateAdmin = await putProfileDetail(admin_id, req.body);
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updateAdmin,
    });
  } catch (err) {
    next(err);
  }
};

export const handleChangePassword = async (
  req: Request<{}, {}, ChangePasswordInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin_id = req.admin?.admin_id;
    if (!admin_id) throw new AppError("Unauthorized", 401);
    await updateAdminPassword(admin_id, req.body);
    return res.status(200).json({
      success: true,
      message: "Password has been changed successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getDashboardFeed = async (
  req: Request<{}, {}, {}, DashboardFilterInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin_id = req.admin?.admin_id;
    const { expense_period } = req.query;
    const data = await getHomeStatus(admin_id!, expense_period);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetDriverDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const admin_id = req.admin?.admin_id;
    if (!admin_id) throw new AppError("Unauthorized", 401);
    const driver = await getDriverInfoById(Number(id), admin_id);
    return res.status(200).json({
      success: true,
      data: driver,
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
    const admin_id = req.admin?.admin_id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const status = req.query.status;
    const result = await getAllExpenseDetails(admin_id!, page, limit, status);

    return res.status(200).json({
      success: true,
      data: result.expenses,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
};

export const handleReviewExpense = async (
  req: Request<{}, {}, ReviewExpenseInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin_id = req.admin?.admin_id;
    if (!admin_id) throw new AppError("Unauthorized", 401);
    const updatedExpense = await postApproveExpenseByID(admin_id, req.body);
    return res.status(200).json({
      success: true,
      message: `Expense successfully marked as ${req.body.status}`,
      data: updatedExpense,
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetTripFeed = async (
  req: Request<{}, {}, {}, GetTripsQueryInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin_id = req.admin?.admin_id;
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit) || 10;
    const status = req.query.status;
    const result = await getAllTrips(admin_id!, page, limit, status);
    return res.status(200).json({
      success: true,
      data: result.trips,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
};

export const handleCreateTrip = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin_id = req.admin?.admin_id;
    if (!admin_id) throw new AppError("Unauthorized", 401);
    const result = await postTrip(admin_id, req.body);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetVehicles = async (
  req: Request<{}, {}, {}, GetVehiclesQueryInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin_id = req.admin?.admin_id;
    // Casting to numbers to avoid Prisma errors
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await getAllVehicles(admin_id!, page, limit, {
      type: req.query.type,
      is_active: req.query.is_active,
    });
    return res.status(200).json({
      success: true,
      data: result.vehicles,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
};

export const handlePostVehicle = async (
  req: Request<{}, {}, CreateVehicleInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin_id = req.admin?.admin_id;
    if (!admin_id) throw new AppError("Unauthorized", 401);
    const vehicle = await postNewVehicle(admin_id, req.body);
    return res.status(201).json({
      success: true,
      message: "Vehicle added to fleet successfully",
      data: vehicle,
    });
  } catch (err) {
    next(err);
  }
};

export const handleUpdateVehicle = async (
  req: Request<{ id: string }, {}, UpdateVehicleInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin_id = req.admin?.admin_id;
    const vehicle_id = parseInt(req.params.id);

    if (!admin_id) throw new AppError("Unauthorized", 401);

    const updatedVehicle = await updateVehicleInfo(
      vehicle_id,
      admin_id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: updatedVehicle,
    });
  } catch (err) {
    next(err);
  }
};
