import { Router } from "express";

import { authCallback } from "../controllers/auth.controller.ts";

const router = Router();

router.get("/callback", authCallback);

export default router;
