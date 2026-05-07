import mongoose from "mongoose";

const levelSchema = new mongoose.Schema(
{
  levelNumber: { type: Number, required: true, unique: true, index: true },

  title: String,
  description: String,

  skills: [{ type: String, index: true }],

  unlockCriteria: {
    minScore: { type: Number, default: 60 },
    minCompletion: { type: Number, default: 80 }
  }
},
{ timestamps: true }
);

export default mongoose.model("Level", levelSchema);