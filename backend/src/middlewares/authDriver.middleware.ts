import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
import { AppError } from "../utils/AppError";
import { JwtPayload } from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      driver?: {
        driver_id: number;
        admin_id: number;
      };
    }
  }
}
export const authenticateDriver = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return next(new AppError("Authentication token required", 401));
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = verifyToken(token);
    console.log("Decoded Token Data:", decoded);
    if (decoded.role !== "driver") {
      return next(new AppError("Access denied: Not a driver account", 403));
    }
    if (!decoded.driver_id || !decoded.admin_id) {
      return next(new AppError("Malformed token payload", 401));
    }
    req.driver = {
      driver_id: decoded.driver_id,
      admin_id: decoded.admin_id,
    };
    next();
  } catch (err: any) {
    console.error("JWT Verification Error:", err.message);
    next(new AppError(err.message || "Invalid or expired token", 401));
  }
};
