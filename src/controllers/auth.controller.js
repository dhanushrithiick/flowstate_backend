import User from "../models/user.model.js";
import Reward from "../models/reward.model.js";
import Level from "../models/level.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    // ✅ Fetch first level and assign on signup
    const firstLevel = await Level.findOne().sort({ levelNumber: 1 });
    if (!firstLevel) return res.status(500).json({ msg: "No levels available" });

    const user = await User.create({
      name,
      email,
      password: hashed,
      age,
      currentLevel: firstLevel._id
    });

    // ✅ create reward
    await Reward.create({ user: user._id });

    // 🔥 UPDATED TOKEN (includes role)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    // 🔥 UPDATED TOKEN (includes role)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

