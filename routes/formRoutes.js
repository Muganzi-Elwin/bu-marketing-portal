import express from "express";
import upload from "../config/multer.js";
import Admission from "../models/admissionModel.js";
import Program from "../models/programModel.js";
import QuickApply from "../models/quickApplyModel.js";
import Feedback from "../models/feedbackModel.js";
import ScholarshipApplication from "../models/scholarshipModel.js";
import BursaryApplication from "../models/bursaryModel.js";
import WorkApplication from "../models/workApplicationModel.js";
import {
  validateAdmission,
  validateBursary,
  validateQuickApply,
  validateScholarship,
  validateWorkApplication
} from "../utils/validators.js";

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

router.post("/quick-apply", async (req, res) => {
  try {
    const { fullName, email, phone, program } = req.body;
    const validation = validateQuickApply(req.body);

    if (!validation.isValid) {
      const programs = await Program.find().sort({ name: 1 }).lean();

      return res.status(400).render("quickApply", {
        errors: validation.errors,
        oldInput: req.body,
        programs,
        selectedProgram: program || ""
      });
    }

    const quickApply = new QuickApply({
      fullName,
      email,
      phone,
      program
    });

    await quickApply.save();

    res.redirect("/feedback?source=quick-apply");
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

router.post("/scholarships/academic", upload.array("documents", 5), async (req, res) => {
  try {
    const type = "Academic Excellence Scholarship";
    const {
      applicantType,
      fullName,
      contact,
      registrationNumber,
      yearOfStudy,
      academicGrades
    } = req.body;
    const validation = validateScholarship({ ...req.body, type });

    if (!validation.isValid) {
      return res.status(400).render("academicScholarship", {
        errors: validation.errors,
        oldInput: req.body
      });
    }

    const documentPaths = req.files ? req.files.map((file) => file.path) : [];

    const application = new ScholarshipApplication({
      type,
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

router.post("/scholarships/sports", upload.array("documents", 5), async (req, res) => {
  try {
    const type = "Sports Scholarship";
    const {
      applicantType,
      fullName,
      contact,
      registrationNumber,
      yearOfStudy,
      sportType,
      achievements
    } = req.body;
    const validation = validateScholarship({ ...req.body, type });

    if (!validation.isValid) {
      return res.status(400).render("sportsScholarship", {
        errors: validation.errors,
        oldInput: req.body
      });
    }

    const documentPaths = req.files ? req.files.map((file) => file.path) : [];

    const application = new ScholarshipApplication({
      type,
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

router.post("/bursaries/needy", upload.array("documents", 5), async (req, res) => {
  try {
    const type = "Needy-Based Bursary";
    const {
      applicantType,
      fullName,
      contact,
      registrationNumber,
      yearOfStudy,
      familyIncome,
      backgroundInfo
    } = req.body;
    const validation = validateBursary({ ...req.body, type });

    if (!validation.isValid) {
      return res.status(400).render("needyBursary", {
        errors: validation.errors,
        oldInput: req.body
      });
    }

    const documentPaths = req.files ? req.files.map((file) => file.path) : [];

    const application = new BursaryApplication({
      type,
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

router.post("/bursaries/church", upload.array("documents", 5), async (req, res) => {
  try {
    const type = "Church Sponsorship";
    const {
      applicantType,
      fullName,
      contact,
      registrationNumber,
      yearOfStudy,
      churchName,
      recommendationDetails
    } = req.body;
    const validation = validateBursary({ ...req.body, type });

    if (!validation.isValid) {
      return res.status(400).render("churchSponsorship", {
        errors: validation.errors,
        oldInput: req.body
      });
    }

    const documentPaths = req.files ? req.files.map((file) => file.path) : [];

    const application = new BursaryApplication({
      type,
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
    const validation = validateWorkApplication(req.body);

    if (!validation.isValid) {
      return res.status(400).render("workApplication", {
        errors: validation.errors,
        oldInput: req.body,
        selectedRole: selectedRole || ""
      });
    }

    const application = new WorkApplication({
      fullName,
      contact,
      registrationNumber,
      selectedRole
    });

    await application.save();

    res.redirect("/feedback?source=work-program");
  } catch (error) {
    console.error("Error submitting work application:", error);
    res.status(500).send("Error submitting work application");
  }
});

// Handle Admission Form
router.post("/admission", upload.array("documents", 5), async (req, res) => {

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

    const validation = validateAdmission(req.body);
    const errors = [...validation.errors];

    if (!dob) {
      errors.push("Date of birth is required.");
    }

    if (!intake) {
      errors.push("Preferred intake is required.");
    }

    if (!req.files || req.files.length === 0) {
      errors.push("Please upload at least one document.");
    }

    if (errors.length > 0) {
      const programs = await Program.find().sort({ name: 1 }).lean();

      return res.status(400).render("admission", {
        errors,
        oldInput: req.body,
        programs,
        selectedProgram: selectedProgram || ""
      });
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
