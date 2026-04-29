import mongoose from "mongoose";

const bursaryApplicationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  applicantType: { type: String, required: true },
  fullName: { type: String, required: true },
  contact: { type: String, required: true },
  registrationNumber: { type: String },
  yearOfStudy: { type: String },
  familyIncome: { type: String },
  backgroundInfo: { type: String },
  churchName: { type: String },
  recommendationDetails: { type: String },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("BursaryApplication", bursaryApplicationSchema);
