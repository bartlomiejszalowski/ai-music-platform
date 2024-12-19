import { Router } from "express";

import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controllers/admin.controller.ts";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.ts";

const router = Router();

//we can do like this insted of using protectRoute and requireAdmin in each line
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums:id", deleteAlbum);

export default router;
