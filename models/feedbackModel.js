import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  source: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Feedback", feedbackSchema);
