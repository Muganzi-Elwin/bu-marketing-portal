import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  school: { type: String, required: true },
  department: { type: String, required: true },
  level: { type: String, required: true }
});

export default mongoose.model("Program", programSchema);
