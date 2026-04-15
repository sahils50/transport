import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { loginAdminSchema } from "../../schemas/auth.schema";
import { authRateLimiter, apiRateLimiter } from "../../config/rateLimiter";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  createAdminSchema,
  updateAdminSchema,
  changePasswordSchema,
} from "../../schemas/admin.schema";
import { createDriverSchema } from "../../schemas/driver.schema";
import {
  handleUpdateProfile,
  createDriverController,
  createAdminController,
  loginAdminController,
  getAdminProfile,
  getDrivers,
  handleChangePassword,
  getDashboardFeed,
  handleGetDriverDetails,
  handleGetExpenseFeed,
  handleReviewExpense,
  handleGetTripFeed,
  handleCreateTrip,
  handleGetVehicles,
  handlePostVehicle,
  handleUpdateVehicle,
} from "../../controllers/admin.controller";
import { dashboardFilterSchema } from "../../schemas/dashboard.schema";
import {
  getExpensesQuerySchema,
  reviewExpenseSchema,
} from "../../schemas/trip_expense.schema";
import {
  createTripSchema,
  getTripsQuerySchema,
} from "../../schemas/trip.schema";
import {
  createVehicleSchema,
  getVehiclesQuerySchema,
  updateVehicleSchema,
} from "../../schemas/vehicle.schema";

const router = Router();
router.post(
  "/login",
  authRateLimiter,
  validate(loginAdminSchema),
  loginAdminController,
);
router.get("/drivers", apiRateLimiter, authenticate, getDrivers);
router.post(
  "/register",
  authRateLimiter,
  validate(createAdminSchema),
  createAdminController,
);
router.get("/profile", apiRateLimiter, authenticate, getAdminProfile);
router.post(
  "/createDriver",
  apiRateLimiter,
  validate(createDriverSchema),
  authenticate,
  createDriverController,
);
router.patch(
  "/profile",
  authRateLimiter,
  authenticate,
  validate(updateAdminSchema),
  handleUpdateProfile,
);
router.patch(
  "/change-password",
  authRateLimiter,
  authenticate,
  validate(changePasswordSchema),
  handleChangePassword,
);
router.get(
  "/dashboard",
  apiRateLimiter,
  authenticate,
  validate(dashboardFilterSchema),
  getDashboardFeed,
);
router.get("/driver/:id", apiRateLimiter, authenticate, handleGetDriverDetails);
router.get(
  "/expenses",
  apiRateLimiter,
  authenticate,
  validate(getExpensesQuerySchema),
  handleGetExpenseFeed,
);
router.post(
  "/expenses/review",
  apiRateLimiter,
  authenticate,
  validate(reviewExpenseSchema),
  handleReviewExpense,
);
router.get(
  "/trips",
  apiRateLimiter,
  authenticate,
  validate(getTripsQuerySchema),
  handleGetTripFeed,
);
router.post(
  "/trips",
  apiRateLimiter,
  authenticate,
  validate(createTripSchema),
  handleCreateTrip,
);
router.get(
  "/vehicles",
  authenticate,
  validate(getVehiclesQuerySchema),
  handleGetVehicles,
);
router.post(
  "/vehicles",
  apiRateLimiter,
  authenticate,
  validate(createVehicleSchema),
  handlePostVehicle,
);
router.put(
  "/vehicles/:id",
  apiRateLimiter,
  authenticate,
  validate(updateVehicleSchema),
  handleUpdateVehicle,
);
export default router;
