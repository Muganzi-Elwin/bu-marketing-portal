import dotenv from "dotenv";
import mongoose from "mongoose";
import Program from "./models/programModel.js";

dotenv.config();

const programs = [
  { name: "BSc Software Engineering", school: "Computing", department: "IT", level: "Undergraduate" },
  { name: "Bachelor of Business Administration", school: "Business", department: "Management", level: "Undergraduate" },
  { name: "BA Theology", school: "Theology", department: "Religious Studies", level: "Undergraduate" },
  { name: "MSc Computer Science", school: "Computing", department: "IT", level: "Masters" }
];

try {
  await mongoose.connect(process.env.MONGO_URI);

  const existingCount = await Program.countDocuments();

  if (existingCount === 0) {
    await Program.insertMany(programs);
    console.log("Programs seeded successfully.");
  } else {
    console.log("Programs already exist. Skipping seed.");
  }
} catch (error) {
  console.error("Error seeding programs:", error);
} finally {
  await mongoose.connection.close();
  process.exit(0);
}
