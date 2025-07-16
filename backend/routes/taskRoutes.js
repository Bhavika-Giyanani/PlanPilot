import {
  createTask,
  getTasks,
  updateTask,
  DeleteTask,
} from "../controllers/taskController.js";
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/api/tasks", protect, getTasks);
router.post("/api/tasks", protect, createTask);
router.put("/api/task/:id", protect, updateTask);
router.delete("/api/task/:id", protect, DeleteTask);

export default router;
