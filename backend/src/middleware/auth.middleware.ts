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
    res.status(401).json({ message: "Unauthorized - you must be logged in" });
    return;
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
      res.status(403).json({ message: "Unauthorized - you must be an admin" });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
