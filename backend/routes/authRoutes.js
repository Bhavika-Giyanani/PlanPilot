import { createUser, getUser } from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/api/login", getUser);
router.post("/api/signup", createUser);

export default router;
