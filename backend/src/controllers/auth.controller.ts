import { Request, Response } from "express";
import { User } from "models/user.model";

export const authCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });

    if (!user) {
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
