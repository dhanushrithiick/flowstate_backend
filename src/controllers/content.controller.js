import mongoose from "mongoose";
import Content from "../models/content.model.js";
import Level from "../models/level.model.js";
import Progress from "../models/progress.model.js";
import Attention from "../models/attention.model.js";
import Intervention from "../models/intervention.model.js";

// CREATE
export const createContent = async (req, res) => {
  try {
    const { title, type, level, order } = req.body;

    // ✅ validation fix
    if (!title || !type || !level || order === undefined) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const exists = await Level.findById(level);
    if (!exists) return res.status(400).json({ msg: "Invalid level" });

    const content = await Content.create(req.body);

    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
export const getContentByLevel = async (req, res) => {
  try {
    // ✅ Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.levelId)) {
      return res.status(400).json({ msg: "Invalid level ID format" });
    }

    // ✅ Validate level exists
    const levelExists = await Level.findById(req.params.levelId);
    if (!levelExists) {
      return res.status(400).json({ msg: "Level not found" });
    }

    const content = await Content.find({ level: req.params.levelId })
      .sort({ order: 1 });

    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateContent = async (req, res) => {
  try {
    // ✅ Prevent level field update after creation
    const { level, ...allowedUpdates } = req.body;

    const content = await Content.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      { new: true }
    );

    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE (🔥 FIXED)
export const deleteContent = async (req, res) => {
  try {
    const contentId = req.params.id;

    await Content.findByIdAndDelete(contentId);
    await Progress.deleteMany({ content: contentId });
    await Attention.deleteMany({ content: contentId });
    await Intervention.deleteMany({ content: contentId }); // ✅ Add orphan cleanup

    res.json({ msg: "Content deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};