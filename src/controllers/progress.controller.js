import Progress from "../models/progress.model.js";
import Content from "../models/content.model.js";
import { checkAndUnlockLevel } from "../services/level.service.js";

export const completeContent = async (req, res) => {
  try {
    const user = req.user.id;
    const { contentId, levelId, score = 100 } = req.body;

    // 🔴 Validation
    if (!contentId || !levelId) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // 🔴 Validate content
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(400).json({ msg: "Content not found" });
    }

    if (content.level.toString() !== String(levelId)) {
      return res.status(400).json({ msg: "Content does not belong to this level" });
    }

    // 🎯 Decide status
    const status = score === 100 ? "completed" : "in_progress";

    // 🚀 UPSERT PROGRESS
    const progress = await Progress.findOneAndUpdate(
      { user, content: contentId },
      {
        user,
        content: contentId,
        level: levelId,
        status,
        score,
        $inc: { attempts: 1 },
        lastAccessedAt: new Date()
      },
      { upsert: true, new: true }
    );

    // 🔓 Unlock next level if completed
    if (status === "completed") {
      await checkAndUnlockLevel(user, levelId);
    }

    res.json(progress);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Get user's progress
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const progress = await Progress.find({ user: userId })
      .populate("content")
      .populate("level");

    res.json(progress);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};