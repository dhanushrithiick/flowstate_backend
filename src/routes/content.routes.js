import express from "express";
import {
  createContent,
  getContentByLevel,
  updateContent,
  deleteContent
} from "../controllers/content.controller.js";

import auth from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";

const router = express.Router();

// admin
router.post("/", auth, admin, createContent);
router.put("/:id", auth, admin, updateContent);
router.delete("/:id", auth, admin, deleteContent);

// user
router.get("/:levelId", auth, getContentByLevel);

export default router;