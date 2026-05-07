import Attention from "../models/attention.model.js";

// 🔥 CREATE / UPDATE ATTENTION (called from Python)
export const updateAttention = async (req, res) => {
  try {
    const { userId, contentId, status } = req.body;

    if (!userId || !contentId || !status) {
      return res.status(400).json({
        msg: "Missing userId, contentId or status",
      });
    }

    const data = await Attention.findOneAndUpdate(
      { user: userId, content: contentId },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },

        // 📊 analytics
        $inc: {
          distractionCount: status !== "Focused" ? 1 : 0,
        },

        $push: {
          events: {
            timestamp: new Date(),
            type: status === "Focused" ? "focus" : "blur",
          },
        },
      },
      {
        upsert: true, // 🔥 create if not exists
        new: true,    // 🔥 return updated doc
      }
    );

    console.log("✅ Attention updated:", status);

    res.json(data);
  } catch (err) {
    console.error("❌ updateAttention error:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔥 GET LATEST ATTENTION (frontend polling)
export const getAttention = async (req, res) => {
  try {
    const { userId, contentId } = req.query;

    if (!userId || !contentId) {
      return res.status(400).json({
        msg: "Missing userId or contentId",
      });
    }

    const data = await Attention.findOne({
      user: userId,
      content: contentId,
    });

    res.json(data || null);
  } catch (err) {
    console.error("❌ getAttention error:", err);
    res.status(500).json({ error: err.message });
  }
};