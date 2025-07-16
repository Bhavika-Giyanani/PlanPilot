import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

// POST /api/signup: Register a new user.
// app.post();
// POST /api/login: Authenticate a user.
// POST /api/logout: Log out a user.
// GET /api/tasks: Retrieve all tasks for the authenticated user.
// POST /api/tasks: Create a new task.
// PUT /api/tasks/:id: Update a task by ID.
// DELETE /api/tasks/:id: Delete a task by ID.

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("", userRoutes);
app.use("", taskRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
