import mongoose from "mongoose";

const interventionSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },

  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content"
  },

  trigger: {
    type: String,
    enum: ["low_attention", "low_score", "idle"]
  },

  action: {
    type: String,
    enum: ["pause_video", "show_quiz", "start_game"]
  },

  metadata: {
    type: Object,
    default: {}
  }
},
{ timestamps: true }
);

export default mongoose.model("Intervention", interventionSchema);