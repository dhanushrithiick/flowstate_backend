import User from "../models/user.model.js";
import Progress from "../models/progress.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.params.userId })
      .populate("content")
      .populate("level");

    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};