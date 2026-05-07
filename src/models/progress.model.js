import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: true,
    index: true
  },

  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level",
    required: true,
    index: true
  },

  status: {
    type: String,
    enum: ["not_started", "in_progress", "completed"],
    default: "not_started"
  },

  score: { type: Number, default: 0 },

  attempts: { type: Number, default: 0 },

  lastAccessedAt: { type: Date, default: Date.now }
},
{ timestamps: true }
);

// 🚀 Prevent duplicate progress per content per user
progressSchema.index({ user: 1, content: 1 }, { unique: true });

export default mongoose.model("Progress", progressSchema);