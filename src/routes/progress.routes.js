import express from "express";
import { completeContent, getUserProgress } from "../controllers/progress.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🎯 Mark content complete / in-progress
router.post("/complete", auth, completeContent);

// 📊 Get user's progress
router.get("/my-progress", auth, getUserProgress);

export default router;