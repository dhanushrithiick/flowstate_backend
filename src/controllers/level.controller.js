import Level from "../models/level.model.js";

export const createLevel = async (req, res) => {
  try {
    const level = await Level.create(req.body);
    res.status(201).json(level);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllLevels = async (req, res) => {
  try {
    const levels = await Level.find().sort({ levelNumber: 1 });
    res.json(levels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLevel = async (req, res) => {
  try {
    const level = await Level.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(level);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ DISABLED DELETE (SAFE)
export const deleteLevel = async (req, res) => {
  return res.status(400).json({
    msg: "Deleting levels is not allowed in this version"
  });
};

// 🔗 link levels
export const linkLevels = async (req, res) => {
  try {
    const { nextLevelId } = req.body;

    // ✅ Prevent self-linking
    if (req.params.id === nextLevelId) {
      return res.status(400).json({ msg: "Cannot link level to itself" });
    }

    // ✅ Validate nextLevel exists (if provided)
    if (nextLevelId) {
      const nextLevelExists = await Level.findById(nextLevelId);
      if (!nextLevelExists) {
        return res.status(400).json({ msg: "Next level not found" });
      }
    }

    const level = await Level.findByIdAndUpdate(
      req.params.id,
      { nextLevel: nextLevelId },
      { new: true }
    );

    res.json(level);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};