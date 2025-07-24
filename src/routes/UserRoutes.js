import express from "express";
import {
  siginUserController,
  signupUserController,
} from "../controllers/UserController.js";
const router = express.Router();
router.post("/signup", signupUserController);
router.post("/signin", siginUserController);
export default router;
