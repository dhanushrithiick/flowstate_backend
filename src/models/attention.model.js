import mongoose from "mongoose";

const attentionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: true,
      index: true,
    },

    // 🔥 CORE FIELD (from Python)
    status: {
      type: String,
      enum: ["Focused", "Not Focused", "Looking Away"],
      default: "Focused",
      required: true,
      index: true,
    },

    // 📊 analytics (optional but useful)
    distractionCount: {
      type: Number,
      default: 0,
    },

    focusScore: {
      type: Number,
      default: 0,
    },

    totalWatchTime: {
      type: Number,
      default: 0,
    },

    events: {
      type: [
        {
          timestamp: {
            type: Date,
            default: Date.now,
          },
          type: {
            type: String,
            enum: ["focus", "blur"],
          },
        },
      ],
      default: [],
      select: false,
    },
  },
  { timestamps: true }
);

// 🔥 Prevent duplicate records per user-content
attentionSchema.index({ user: 1, content: 1 }, { unique: true });

export default mongoose.model("Attention", attentionSchema);