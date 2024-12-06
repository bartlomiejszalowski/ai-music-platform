import dontenv from "dotenv";
import express from "express";

import adminRoutes from "./routes/admin.route.ts";
import authRoutes from "./routes/auth.route.ts";
import songRoutes from "./routes/song.route.ts";
import userRoutes from "./routes/user.route.ts";

dontenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
// app.use("/api/albums", albumRoutes);
// app.use("/api/albums", albumRoutes);
// app.use("/api/stats", statsRoutes);

app.listen(PORT, () => {
  console.log(" ⚡ Server is running on port 5000 ⚡");
});
