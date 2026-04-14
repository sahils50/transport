import { driverLoginSchema } from "../../schemas/driver.schema";
import {
  handleDriverLogin,
  handleGetAdminContact,
  handleGetExpenseDetail,
  handleGetExpenseFeed,
  handleGetProfile,
  handlePostExpense,
} from "../../controllers/driver.controller";
import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { apiRateLimiter, authRateLimiter } from "../../config/rateLimiter";
import { authenticateDriver } from "../../middlewares/authDriver.middleware";
import { postExpenseSchema } from "../../schemas/trip_expense.schema";
const router = Router();
router.post(
  "/login",
  authRateLimiter,
  validate(driverLoginSchema),
  handleDriverLogin,
);
router.get("/profile", apiRateLimiter, authenticateDriver, handleGetProfile);
router.get("/owner", apiRateLimiter, authenticateDriver, handleGetAdminContact);
router.get(
  "/expenses",
  apiRateLimiter,
  authenticateDriver,
  handleGetExpenseFeed,
);
router.get(
  "/expenses/:id",
  apiRateLimiter,
  authenticateDriver,
  handleGetExpenseDetail,
);

router.post(
  "/expenses",
  authenticateDriver,
  validate(postExpenseSchema),
  handlePostExpense,
);
export default router;
