import express from "express";
import upload from "../config/multer.js";
import Admission from "../models/admissionModel.js";
import Program from "../models/programModel.js";
import QuickApply from "../models/quickApplyModel.js";
import Feedback from "../models/feedbackModel.js";
import ScholarshipApplication from "../models/scholarshipModel.js";
import BursaryApplication from "../models/bursaryModel.js";
import WorkApplication from "../models/workApplicationModel.js";

const router = express.Router();
const registrationNumberRegex = /^\d{2}\/[A-Z]{2,5}\/BU\/R\/\d{4}$/;
const registrationNumberError = "Invalid registration number format. Use 24/BSE/BU/R/0005";

const continuingRegistrationNumberIsInvalid = (applicantType, registrationNumber) => {
  return applicantType === "continuing" && !registrationNumberRegex.test(registrationNumber || "");
};

router.get("/programs-data", async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ message: "Error fetching programs" });
  }
});

router.post("/quick-apply", async (req, res) => {
  try {
    const { fullName, email, phone, program } = req.body;

    if (!fullName || !email || !phone || !program) {
      return res.status(400).send("Missing required fields");
    }

    const quickApply = new QuickApply({
      fullName,
      email,
      phone,
      program
    });

    await quickApply.save();

    res.redirect("/feedback");
  } catch (error) {
    console.error("Error submitting quick apply form:", error);
    res.status(500).send("Error submitting quick apply form");
  }
});

router.post("/feedback", async (req, res) => {
  try {
    const { source, rating, comment } = req.body;

    if (!source || !rating) {
      return res.status(400).send("Missing required fields");
    }

    const feedback = new Feedback({
      source,
      rating,
      comment
    });

    await feedback.save();

    res.redirect("/?success=feedback");
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).send("Error submitting feedback");
  }
});

router.post("/scholarships/academic", upload.array("documents"), async (req, res) => {
  try {
    const {
      applicantType,
      fullName,
      contact,
      registrationNumber,
      yearOfStudy,
      academicGrades
    } = req.body;

    if (!applicantType || !fullName || !contact || !academicGrades) {
      return res.status(400).send("Missing required fields");
    }

    if (continuingRegistrationNumberIsInvalid(applicantType, registrationNumber)) {
      return res.status(400).send(registrationNumberError);
    }

    const documentPaths = req.files ? req.files.map((file) => file.path) : [];

    const application = new ScholarshipApplication({
      type: "Academic Excellence Scholarship",
      applicantType,
      fullName,
      contact,
      registrationNumber,
      yearOfStudy,
      academicGrades,
      documentPath: documentPaths[0],
      documentPaths
    });

    await application.save();

    res.redirect("/feedback?source=financial-support");
  } catch (error) {
    console.error("Error submitting academic scholarship application:", error);
    res.status(500).send("Error submitting academic scholarship application");
  }
});

router.post("/scholarships/sports", upload.array("documents"), async (req, res) => {
  try {
    const {
      applicantType,
      fullName,
      contact,
      registrationNumber,
      yearOfStudy,
      sportType,
      achievements
    } = req.body;

    if (!applicantType || !fullName || !contact || !sportType || !achievements) {
      return res.status(400).send("Missing required fields");
    }

    if (continuingRegistrationNumberIsInvalid(applicantType, registrationNumber)) {
      return res.status(400).send(registrationNumberError);
    }

    const documentPaths = req.files ? req.files.map((file) => file.path) : [];

    const application = new ScholarshipApplication({
      type: "Sports Scholarship",
      applicantType,
      fullName,
      contact,
      registrationNumber,
      yearOfStudy,
      sportType,
      achievements,
      documentPaths
    });

    await application.save();

    res.redirect("/feedback?source=financial-support");
  } catch (error) {
    console.error("Error submitting sports scholarship application:", error);
    res.status(500).send("Error submitting sports scholarship application");
  }
});

router.post("/bursaries/needy", upload.array("documents"), async (req, res) => {
  try {
    const {
      applicantType,
      fullName,
      contact,
      registrationNumber,
      yearOfStudy,
      familyIncome,
      backgroundInfo
    } = req.body;

    if (!applicantType || !fullName || !contact || !familyIncome || !backgroundInfo) {
      return res.status(400).send("Missing required fields");
    }

    if (continuingRegistrationNumberIsInvalid(applicantType, registrationNumber)) {
      return res.status(400).send(registrationNumberError);
    }

    const documentPaths = req.files ? req.files.map((file) => file.path) : [];

    const application = new BursaryApplication({
      type: "Needy-Based Bursary",
      applicantType,
      fullName,
      contact,
      registrationNumber,
      yearOfStudy,
      familyIncome,
      backgroundInfo,
      documentPaths
    });

    await application.save();

    res.redirect("/feedback?source=financial-support");
  } catch (error) {
    console.error("Error submitting needy bursary application:", error);
    res.status(500).send("Error submitting needy bursary application");
  }
});

router.post("/bursaries/church", upload.array("documents"), async (req, res) => {
  try {
    const {
      applicantType,
      fullName,
      contact,
      registrationNumber,
      yearOfStudy,
      churchName,
      recommendationDetails
    } = req.body;

    if (!applicantType || !fullName || !contact || !churchName || !recommendationDetails) {
      return res.status(400).send("Missing required fields");
    }

    if (continuingRegistrationNumberIsInvalid(applicantType, registrationNumber)) {
      return res.status(400).send(registrationNumberError);
    }

    const documentPaths = req.files ? req.files.map((file) => file.path) : [];

    const application = new BursaryApplication({
      type: "Church Sponsorship",
      applicantType,
      fullName,
      contact,
      registrationNumber,
      yearOfStudy,
      churchName,
      recommendationDetails,
      documentPaths
    });

    await application.save();

    res.redirect("/feedback?source=financial-support");
  } catch (error) {
    console.error("Error submitting church sponsorship application:", error);
    res.status(500).send("Error submitting church sponsorship application");
  }
});

router.post("/work/apply", async (req, res) => {
  try {
    const { fullName, contact, registrationNumber, selectedRole } = req.body;

    if (!fullName || !contact || !registrationNumber || !selectedRole) {
      return res.status(400).send("Missing required fields");
    }

    if (!registrationNumberRegex.test(registrationNumber)) {
      return res.status(400).send(registrationNumberError);
    }

    const application = new WorkApplication({
      fullName,
      contact,
      registrationNumber,
      selectedRole
    });

    await application.save();

    res.redirect("/success?type=work");
  } catch (error) {
    console.error("Error submitting work application:", error);
    res.status(500).send("Error submitting work application");
  }
});

// Handle Admission Form
router.post("/admission", upload.array("documents", 10), async (req, res) => {

  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

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

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("Please upload a document");
    }

    const documentPaths = req.files ? req.files.map(file => file.path) : [];

    const newAdmission = new Admission({
      fullName,
      dob,
      email,
      phone,
      address,
      previousSchool,
      selectedProgram,
      intake,
      documentPath: documentPaths[0],
      documentPaths
    });

    await newAdmission.save();

    console.log("Saved:", newAdmission._id);

    res.redirect("/feedback?source=admission");

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).send(error.message);
  }

});

export default router;
