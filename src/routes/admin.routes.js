import express from "express";
import {
  getAllUsers,
  getUserProgress
} from "../controllers/admin.controller.js";

import auth from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/users", auth, admin, getAllUsers);
router.get("/users/:userId/progress", auth, admin, getUserProgress);

export default router;