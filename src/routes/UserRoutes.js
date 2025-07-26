import express from "express";
import {
  getUserByIdController,
  siginUserController,
  signupUserController,
} from "../controllers/UserController.js";
const router = express.Router();
router.post("/signup", signupUserController);
router.post("/signin", siginUserController);
router.get("/:id", getUserByIdController);
export default router;
