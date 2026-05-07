import Progress from "../models/progress.model.js";
import Content from "../models/content.model.js";

export const updateProgress = async ({ user, content, level, score }) => {
  // ✅ Validate content/level consistency
  const contentDoc = await Content.findById(content);
  if (!contentDoc) {
    throw new Error("Content not found");
  }
  if (contentDoc.level.toString() !== String(level)) {
    throw new Error("Content/Level mismatch");
  }

  return await Progress.findOneAndUpdate(
    { user, content },
    {
      $set: {
        status: "completed",
        score,
        lastAccessedAt: new Date()
      },
      $inc: { attempts: 1 }
    },
    { upsert: true, new: true }
  );
};