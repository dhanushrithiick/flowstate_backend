import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    index: true
  },

  age: Number,

  profile: {
    attentionSpan: { type: Number, default: 30 }
  },

  currentLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level",
    index: true
  },

  currentContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content"
  }
},
{ timestamps: true }
);

export default mongoose.model("User", userSchema);