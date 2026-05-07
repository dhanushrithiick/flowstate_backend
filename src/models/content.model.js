import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
{
  title: { type: String, required: true },

  type: {
    type: String,
    enum: ["video", "quiz", "game"],
    required: true,
    index: true
  },

  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level",
    required: true,
    index: true
  },

  skillTag: { type: String, index: true },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
    index: true
  },

  order: { type: Number, required: true },

  // overall duration (optional fallback)
  duration: { type: Number, default: 0 },

  data: {
    // 🎥 VIDEO DATA
    videoUrl: { type: String, default: null },
    thumbnail: { type: String, default: null },
    captions: { type: String, default: null }, // subtitles
    videoDuration: { type: Number, default: 0 },

    // ❓ QUIZ DATA
    questions: {
      type: [
        {
          question: { type: String, required: true },
          options: { type: [String], default: [] },
          answer: { type: String, required: true }
        }
      ],
      default: []
    },

    // 🎮 GAME DATA
    gameConfig: {
      type: Object,
      default: {}
    }
  }
},
{ timestamps: true }
);

// 🚀 prevent duplicate order inside same level
contentSchema.index({ level: 1, order: 1 }, { unique: true });

export default mongoose.model("Content", contentSchema);