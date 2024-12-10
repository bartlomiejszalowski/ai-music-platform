import { clerkClient } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

interface ClerkRequest extends Request {
  auth: {
    userId?: string;
  };
}

export const protectRoute = async (
  req: ClerkRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.auth.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - you must be logged in" });
  }

  next();
};

export const requireAdmin = async (
  req: ClerkRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin = process.env.ADMIN_EMAILS.includes(
      currentUser.primaryEmailAddress.emailAddress
    );

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized - you must be an admin" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
