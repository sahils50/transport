import express, { Request, Response } from "express";
import v1Routes from "./routes/v1/index";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";
import { apiRateLimiter } from "./config/rateLimiter";
import pinoHttp from "pino-http";
import logger from "./utils/logger";

const app = express();

// Security & parsing
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttp({ logger }));

// Rate limit then routes
app.use("/api/v1", apiRateLimiter, v1Routes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler — must be last
app.use(errorHandler);

export default app;
