import express from "express";
import {
  createLevel,
  getAllLevels,
  updateLevel,
  deleteLevel,
  linkLevels
} from "../controllers/level.controller.js";

import auth from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/", auth, admin, createLevel);
router.get("/", auth, getAllLevels);
router.put("/:id", auth, admin, updateLevel);
router.delete("/:id", auth, admin, deleteLevel);

// link next level
router.put("/:id/link", auth, admin, linkLevels);

export default router;