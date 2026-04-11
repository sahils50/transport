import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { loginAdminSchema } from "../../schemas/auth.schema";
import { authRateLimiter } from "../../config/rateLimiter";
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
} from "../../controllers/admin.controller";
import {
  DashboardFilterInput,
  dashboardFilterSchema,
} from "../../schemas/dashboard.schema";
const router = Router();
/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     summary: Admin login
 *     description: Authenticate admin and return JWT token
 *     tags: [Auth]
 *     security: []   # 🔓 No JWT required for login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email_address:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post(
  "/login",
  authRateLimiter,
  validate(loginAdminSchema),
  loginAdminController,
);

/**
 * @swagger
 * /api/v1/admin/drivers:
 *   get:
 *     summary: Get all drivers for admin
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of drivers
 *       401:
 *         description: Unauthorized
 */
router.get("/drivers", authRateLimiter, authenticate, getDrivers);
/**
 * @swagger
 * /api/v1/admin/register:
 *   post:
 *     summary: Register a new admin
 *     description: Creates a new admin account with an auto-generated unique business code
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email_address
 *               - password
 *               - phone_no
 *             properties:
 *               email_address:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: strongpassword123
 *               business_name:
 *                 type: string
 *                 maxLength: 200
 *                 example: Acme Logistics
 *               phone_no:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 20
 *                 example: "9876543210"
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Admin created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     admin_id:
 *                       type: integer
 *                       example: 1
 *                     email_address:
 *                       type: string
 *                       example: admin@example.com
 *                     business_name:
 *                       type: string
 *                       example: Acme Logistics
 *                     business_code:
 *                       type: string
 *                       example: A3F9KL
 *                     phone_no:
 *                       type: string
 *                       example: "9876543210"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-01-01T00:00:00.000Z
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation error
 *       409:
 *         description: Email or phone number already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Email already registered
 *       429:
 *         description: Too many requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Too many requests, please try again later
 */
router.post(
  "/register",
  authRateLimiter,
  validate(createAdminSchema),
  createAdminController,
);

router.get("/profile", authRateLimiter, authenticate, getAdminProfile);
/**
 * @swagger
 * /api/v1/admin/createDriver:
 *   post:
 *     summary: Create a new driver
 *     tags: [Drivers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - admin_id
 *               - driver_name
 *               - driver_phone_no1
 *               - driver_license_no
 *               - driver_license_type
 *               - driver_license_expiry_date
 *             properties:
 *               admin_id:
 *                 type: integer
 *                 example: 1
 *               driver_name:
 *                 type: string
 *                 example: Jackson Storm
 *               driver_phone_no1:
 *                 type: string
 *                 example: "9988776655"
 *               driver_phone_no2:
 *                 type: string
 *                 nullable: true
 *                 example: "9876543210"
 *               driver_license_no:
 *                 type: string
 *                 example: LIC-998877
 *               driver_license_type:
 *                 type: string
 *                 example: Heavy Vehicle
 *               driver_license_expiry_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2028-12-31T00:00:00.000Z
 *     responses:
 *       201:
 *         description: Driver created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Driver create successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     driver_id:
 *                       type: integer
 *                       example: 1
 *                     admin_id:
 *                       type: integer
 *                       example: 1
 *                     driver_name:
 *                       type: string
 *                     driver_phone_no1:
 *                       type: string
 *                     driver_phone_no2:
 *                       type: string
 *                       nullable: true
 *                     driver_license_no:
 *                       type: string
 *                     driver_license_type:
 *                       type: string
 *                     driver_license_expiry_date:
 *                       type: string
 *                       format: date-time
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       409:
 *         description: Driver already exists (phone or license conflict)
 *       500:
 *         description: Internal server error
 */
router.post(
  "/createDriver",
  authRateLimiter,
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
  authRateLimiter,
  authenticate,
  validate(dashboardFilterSchema),
  getDashboardFeed,
);
// Protected routes (add authenticate middleware)
// router.get("/profile",authRateLimiter, authenticate, getAdminProfileController);
// router.patch("/profile", authenticate, validate(updateAdminSchema), updateAdminController);
export default router;
