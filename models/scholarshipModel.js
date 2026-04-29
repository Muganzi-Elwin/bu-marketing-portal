import mongoose from "mongoose";

const scholarshipApplicationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  applicantType: { type: String, required: true },
  fullName: { type: String, required: true },
  contact: { type: String, required: true },
  registrationNumber: { type: String },
  yearOfStudy: { type: String },
  academicGrades: { type: String },
  sportType: { type: String },
  achievements: { type: String },
  documentPath: { type: String },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ScholarshipApplication", scholarshipApplicationSchema);
