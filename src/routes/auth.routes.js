import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.middleware.js"; // ✅ FIXED
import User from "../models/user.model.js";

const router = express.Router();

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

// get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;