import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ejs from "ejs";
import formRoutes from "./routes/formRoutes.js";
import Program from "./models/programModel.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use("/", formRoutes);

// View engine (explicit fix for EJS in ES modules)
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");
app.set("views", "./views");

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.get("/", async (req, res) => {
  try {
    const featuredPrograms = await Program.find().limit(4).lean();
    res.render("home", {
      featuredPrograms,
      success: req.query.success
    });
  } catch (error) {
    console.error("Error loading featured programs:", error);
    res.render("home", {
      featuredPrograms: [],
      success: req.query.success,
      errorMessage: "Unable to load featured programs at the moment."
    });
  }
});

app.get("/programs", async (req, res) => {
  try {
    const programs = await Program.find().sort({ school: 1, department: 1, level: 1, name: 1 }).lean();
    console.log(programs);

    const levelLabels = {
      Undergraduate: "Undergraduate Programs",
      Masters: "Masters Programs",
      PhD: "PhD Programs",
      Graduate: "Graduate Programs",
      "Short Course": "Short Courses"
    };

    const schoolsMap = new Map();

    programs.forEach((program) => {
      const level = levelLabels[program.level] || program.level;

      if (!schoolsMap.has(program.school)) {
        schoolsMap.set(program.school, {
          id: program.school,
          name: program.school,
          departments: new Map()
        });
      }

      const school = schoolsMap.get(program.school);

      if (!school.departments.has(program.department)) {
        school.departments.set(program.department, {
          id: `${program.school}-${program.department}`,
          name: program.department,
          programs: {}
        });
      }

      const department = school.departments.get(program.department);

      if (!department.programs[level]) {
        department.programs[level] = [];
      }

      department.programs[level].push({
        _id: program._id.toString(),
        id: program._id.toString(),
        name: program.name
      });
    });

    const programsData = Array.from(schoolsMap.values()).map((school) => ({
      ...school,
      departments: Array.from(school.departments.values())
    }));

    console.log(programsData);

    res.render("programs", { programsData });
  } catch (error) {
    console.error("Error loading programs:", error);
    res.status(500).render("programs", {
      programsData: [],
      errorMessage: "Unable to load programs at the moment."
    });
  }
});

app.get("/programs/:id", async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).lean();

    if (!program) {
      return res.status(404).render("programDetails", {
        program: null,
        errorMessage: "Program not found."
      });
    }

    res.render("programDetails", { program });
  } catch (error) {
    console.error("Error loading program details:", error);
    res.status(500).render("programDetails", {
      program: null,
      errorMessage: "Unable to load program details at the moment."
    });
  }
});

app.get("/quick-apply", async (req, res) => {
  try {
    const programs = await Program.find().sort({ name: 1 }).lean();
    res.render("quickApply", {
      programs,
      selectedProgram: req.query.program || ""
    });
  } catch (error) {
    console.error("Error loading quick apply form:", error);
    res.status(500).render("quickApply", {
      programs: [],
      selectedProgram: req.query.program || "",
      errorMessage: "Unable to load programs at the moment."
    });
  }
});

app.get("/financial-support", (req, res) => {
  res.render("financialSupport");
});

app.get("/scholarships/academic", (req, res) => {
  res.render("academicScholarship");
});

app.get("/scholarships/sports", (req, res) => {
  res.render("sportsScholarship");
});

app.get("/bursaries/needy", (req, res) => {
  res.render("needyBursary");
});

app.get("/bursaries/church", (req, res) => {
  res.render("churchSponsorship");
});

app.get("/work", (req, res) => {
  res.render("work");
});

app.get("/work/apply", (req, res) => {
  res.render("workApplication", { selectedRole: req.query.role || "" });
});

app.get("/events", (req, res) => {
  res.render("events");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/admission", (req, res) => {
  res.render("admission");
});

app.get("/feedback", (req, res) => {
  res.render("feedback", { source: req.query.source || "" });
});

app.get("/success", (req, res) => {
  res.render("success", { type: req.query.type || "" });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
