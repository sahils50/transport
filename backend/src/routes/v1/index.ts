import { Router } from "express";
import adminRoutes from "./admin.route";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../config/swagger";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
