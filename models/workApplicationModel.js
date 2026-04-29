import mongoose from "mongoose";

const workApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contact: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  selectedRole: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("WorkApplication", workApplicationSchema);
