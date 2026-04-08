import { Router } from "express";
import { loginAdminController } from "../../controllers/admin.controller";
import { validate } from "../../middlewares/validate.middleware";
import { loginAdminSchema } from "../../schemas/auth.schema";
import { authRateLimiter } from "../../config/rateLimiter";

const router = Router();

router.post(
  "/login",
  validate(loginAdminSchema),
  loginAdminController,
  authRateLimiter,
);
// Protected routes (add authenticate middleware)
// router.get("/profile", authenticate, getAdminProfileController);
// router.patch("/profile", authenticate, validate(updateAdminSchema), updateAdminController);
export default router;
