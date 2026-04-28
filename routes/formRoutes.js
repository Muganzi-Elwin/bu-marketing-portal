import express from "express";
import upload from "../config/multer.js";
import Admission from "../models/admissionModel.js";
import Program from "../models/programModel.js";

const router = express.Router();

router.get("/programs-data", async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ message: "Error fetching programs" });
  }
});

// Handle Admission Form
router.post("/admission", upload.single("documents"), async (req, res) => {

  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      fullName,
      dob,
      email,
      phone,
      address,
      previousSchool,
      selectedProgram,
      intake
    } = req.body;

    // Validation
    if (!fullName || !email || !phone) {
      return res.status(400).send("Missing required fields");
    }

    if (!req.file) {
      return res.status(400).send("Please upload a document");
    }

    const newAdmission = new Admission({
      fullName,
      dob,
      email,
      phone,
      address,
      previousSchool,
      selectedProgram,
      intake,
      documentPath: req.file.path
    });

    await newAdmission.save();

    console.log("Saved:", newAdmission._id);

    res.redirect("/success");

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).send(error.message);
  }

});

export default router;
