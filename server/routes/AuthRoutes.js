import { Router } from "express";
import { checkUser, onBoardUser, test } from "../controllers/AuthController.js";

const router = Router();
router.get("/test", test);
router.post("/check-user", checkUser);
router.post("/onboard-user", onBoardUser);

export default router;
