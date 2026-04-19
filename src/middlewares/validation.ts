import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  } catch (error) {
    console.error("Validation middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
