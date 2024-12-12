import { Router } from "express";

import { createSong } from "../controllers/admin.controller.ts";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.ts";

const router = Router();

router.get("/", protectRoute, requireAdmin, createSong);

export default router;
