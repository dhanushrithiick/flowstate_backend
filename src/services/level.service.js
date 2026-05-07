import Progress from "../models/progress.model.js";
import Level from "../models/level.model.js";
import User from "../models/user.model.js";
import Content from "../models/content.model.js";

export const checkAndUnlockLevel = async (userId, levelId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    if (!user.currentLevel || String(user.currentLevel) !== String(levelId)) {
      return;
    }

    const level = await Level.findById(levelId);
    if (!level) return;

    // 🔥 GET ALL CONTENT IN THIS LEVEL
    const contents = await Content.find({ level: levelId });

    const totalContents = contents.length;
    if (totalContents === 0) return;

    const contentIds = contents.map(c => c._id);

    // 🔥 GET PROGRESS USING CONTENT (NOT LEVEL)
    const progress = await Progress.find({
      user: userId,
      content: { $in: contentIds }
    });

    const completed = progress.filter(p => p.status === "completed").length;

    const completionPercent = (completed / totalContents) * 100;

    const avgScore =
      progress.length > 0
        ? progress.reduce((acc, p) => acc + p.score, 0) / progress.length
        : 0;

    console.log("---- LEVEL CHECK ----");
    console.log("Total:", totalContents);
    console.log("Completed:", completed);
    console.log("Completion %:", completionPercent);

    if (
      completionPercent >= level.unlockCriteria.minCompletion &&
      avgScore >= level.unlockCriteria.minScore
    ) {
      const nextLevel = await Level.findOne({
        levelNumber: level.levelNumber + 1
      });

      if (!nextLevel) return;

      console.log("🚀 Unlocking Level:", nextLevel.levelNumber);

      await User.findByIdAndUpdate(userId, {
        currentLevel: nextLevel._id
      });
    }

  } catch (err) {
    console.error("Unlock error:", err);
  }
};