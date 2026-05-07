import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    index: true
  },

  points: { type: Number, default: 0 },

  badges: { type: [String], default: [] },

  streak: { type: Number, default: 0 },

  lastActive: Date
},
{ timestamps: true }
);

export default mongoose.model("Reward", rewardSchema);