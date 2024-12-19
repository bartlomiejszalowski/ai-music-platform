import { clerkMiddleware } from "@clerk/express";
import dontenv from "dotenv";
import express, { Request, Response } from "express";
import fileUpload from "express-fileupload";
import path from "path";

import { connectDB } from "./lib/db.ts";
import adminRoutes from "./routes/admin.route.ts";
import albumRoutes from "./routes/album.route.ts";
import authRoutes from "./routes/auth.route.ts";
import songRoutes from "./routes/song.route.ts";
import statRoutes from "./routes/stat.route.ts";
import userRoutes from "./routes/user.route.ts";

dontenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json()); // for parsing req.body
app.use(clerkMiddleware()); // this will add auth to req object => req.auth.userId
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  })
);

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

//error handler
app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error 🚑"
        : err.message,
  });
});

app.listen(PORT, () => {
  console.log(" ⚡ Server is running on port 5000 ⚡");
  connectDB();
});
