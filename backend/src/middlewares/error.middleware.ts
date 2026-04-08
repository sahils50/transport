import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Known operational error (thrown by us)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Prisma known errors
  if (err.constructor.name === "PrismaClientKnownRequestError") {
    const prismaErr = err as any;
    if (prismaErr.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: `${prismaErr.meta?.target} already exists`,
      });
    }
  }

  // Unknown / unexpected error — don't leak internals
  console.error("UNHANDLED ERROR:", err);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
