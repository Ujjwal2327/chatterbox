import { Router } from "express";
import {
  translateFront
} from "../controllers/AWSTranslateController.js";

const router = Router();
router.post("/", translateFront);

export default router;
