import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  previousSchool: { type: String, required: true },
  selectedProgram: { type: String, required: true },
  intake: { type: String, required: true },
  documentPath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Admission", admissionSchema);