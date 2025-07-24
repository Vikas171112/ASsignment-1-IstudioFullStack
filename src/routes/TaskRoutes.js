import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTaskController,
  updateTaskController,
} from "../controllers/TaskController.js";
const router = express.Router();
router.post("/createtask", createTaskController);
router.get("/getalltask", getAllTaskController);
router.put("/update/:id", updateTaskController);
router.delete("/delete/:id", deleteTaskController);
export default router;
