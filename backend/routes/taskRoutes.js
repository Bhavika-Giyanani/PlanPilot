const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController.js");
const express = require("express");
const protect = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/tasks", protect, getTasks);
router.post("/tasks", protect, createTask);
router.put("/task/:id", protect, updateTask);
router.delete("/task/:id", protect, deleteTask);

module.exports = router;
