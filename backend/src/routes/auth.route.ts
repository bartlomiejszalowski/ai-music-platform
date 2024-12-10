import { authCallback } from "controllers/auth.controller.ts";
import { Router } from "express";

const router = Router();

router.get("/callback", authCallback);

export default router;
