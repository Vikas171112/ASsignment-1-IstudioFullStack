import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTaskController,
  updateTaskController,
} from "../controllers/TaskController.js";
import { isAuthenticated } from "../middllewares/authMiddleware.js";
const router = express.Router();
router.post("/createtask", isAuthenticated, createTaskController);
router.get("/getalltask", isAuthenticated, getAllTaskController);
router.put("/update/:id", isAuthenticated, updateTaskController);
router.delete("/delete/:id", isAuthenticated, deleteTaskController);
export default router;
