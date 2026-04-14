import { Request, Response, NextFunction } from "express";
import * as z from "zod";

export const validate =
  <T extends z.ZodType>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (result.success) return next();

    // result.error is a ZodError
    return res.status(400).json({
      status: "error",
      errors: result.error.issues.map((iss) => ({
        field: iss.path[1],
        message: iss.message,
      })),
    });
  };
