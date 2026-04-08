import { Router } from "express";
import adminRoutes from "./admin.route";

const router = Router();

router.use("/admin", adminRoutes);

export default router;
