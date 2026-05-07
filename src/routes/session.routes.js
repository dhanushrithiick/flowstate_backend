import express from "express";
import {
  startSession,
  getActiveSession
} from "../controllers/session.controller.js";

const router = express.Router();

router.post("/start", startSession);
router.get("/active", getActiveSession);

export default router;