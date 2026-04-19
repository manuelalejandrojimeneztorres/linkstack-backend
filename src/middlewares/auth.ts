import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const reason = "Invalid or expired authentication token"; // "Required credentials" => Log in
    const error = new Error(`Unauthorized: ${reason}`);
    res.status(401).json({ error: error.message });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    const reason = "Invalid or expired authentication token"; // "Required credentials" => Log in
    const error = new Error(`Unauthorized: ${reason}`);
    res.status(401).json({ error: error.message });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is not defined.");
    }

    const result = jwt.verify(token, secret);
    if (typeof result === "object" && result.id) {
      const user = await User.findById(result.id).select("-password");
      if (!user) {
        const reason = "User not found";
        const error = new Error(`Unauthorized: ${reason}`);
        res.status(404).json({ error: error.message });
        return;
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Invalid or expired authentication token" });
  }
};
