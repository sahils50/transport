import express, { Request, Response } from "express";
import morgan from "morgan";
import v1Routes from "./routes/v1/index";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";
import { apiRateLimiter } from "./config/rateLimiter";

const app = express();

// Security & parsing
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Rate limit then routes
app.use("/api/v1", apiRateLimiter, v1Routes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler — must be last
app.use(errorHandler);

export default app;
