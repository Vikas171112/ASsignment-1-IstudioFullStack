import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTaskController,
  getTaskById,
  updateTaskController,
} from "../controllers/TaskController.js";
import { isAuthenticated } from "../middllewares/authMiddleware.js";
const router = express.Router();
router.post("/createtask", isAuthenticated, createTaskController);
router.get("/alltask", isAuthenticated, getAllTaskController);
router.get("/:id", isAuthenticated, getTaskById);

router.put("/update/:id", isAuthenticated, updateTaskController);
router.delete("/delete/:id", isAuthenticated, deleteTaskController);
export default router;
