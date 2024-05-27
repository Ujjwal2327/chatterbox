import { Router } from "express";
import {
  changeCurrentChatUser,
  getAllUsers,
} from "../controllers/UserController.js";

const router = Router();
router.get("/get-contacts", getAllUsers);
router.post("/change-currentchatuser", changeCurrentChatUser);

export default router;
