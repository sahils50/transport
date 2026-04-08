import { Request, Response, NextFunction } from "express";
import { LoginAdminInput } from "../schemas/auth.schema";
import { loginAdmin } from "../services/admin.service";

export const loginAdminController = async (
  req: Request<{}, {}, LoginAdminInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await loginAdmin(req.body);
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
