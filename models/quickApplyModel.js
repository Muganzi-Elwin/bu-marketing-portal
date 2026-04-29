import mongoose from "mongoose";

const quickApplySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  program: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("QuickApply", quickApplySchema);
