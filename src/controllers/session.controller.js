import Session from "../models/session.model.js";

// 🔥 START SESSION (KEEP THIS SAME)
export const startSession = async (req, res) => {
  try {
    const { userId, contentId } = req.body;

    if (!userId || !contentId) {
      return res.status(400).json({ msg: "Missing userId or contentId" });
    }

    // deactivate previous sessions for this user
    await Session.updateMany(
      { user: userId },
      { $set: { isActive: false } }
    );

    // create new session
    const session = await Session.create({
      user: userId,
      content: contentId,
      isActive: true,
    });

    console.log("✅ New Active Session:", session);

    res.json(session);
  } catch (err) {
    console.error("❌ startSession error:", err);
    res.status(500).json({ error: err.message });
  }
};


// 🔥 FINAL FIXED GET ACTIVE SESSION (IMPORTANT)
export const getActiveSession = async (req, res) => {
  try {
    // 🔥 ALWAYS RETURN LATEST SESSION (NO userId needed)
    const session = await Session.findOne({})
      .sort({ updatedAt: -1 });

    res.json(session || null);
  } catch (err) {
    console.error("❌ getActiveSession error:", err);
    res.status(500).json({ error: err.message });
  }
};