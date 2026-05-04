import dotenv from "dotenv";
import mongoose from "mongoose";
import Program from "./models/programModel.js";

dotenv.config();

const programs = [
  {
    name: "Bachelor of Science in Accounting",
    school: "School of Business",
    department: "Department of Accounting and Finance",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Science in Finance and Banking",
    school: "School of Business",
    department: "Department of Accounting and Finance",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Business Administration (Accounting & Insurance)",
    school: "School of Business",
    department: "Department of Accounting and Finance",
    level: "Undergraduate Programs"
  },
  {
    name: "Diploma in Accounting",
    school: "School of Business",
    department: "Department of Accounting and Finance",
    level: "Graduate Programs"
  },
  {
    name: "Bachelor of Entrepreneurship and Small Business Management",
    school: "School of Business",
    department: "Department of Management",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Arts in Economics",
    school: "School of Business",
    department: "Department of Management",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Arts in Human Resource Management",
    school: "School of Business",
    department: "Department of Management",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Procurement and Supply Chain Management",
    school: "School of Business",
    department: "Department of Management",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Secretarial Studies and Office Administration",
    school: "School of Business",
    department: "Department of Management",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Business Administration",
    school: "School of Business",
    department: "Department of Management",
    level: "Undergraduate Programs"
  },
  {
    name: "Diploma in Management",
    school: "School of Business",
    department: "Department of Management",
    level: "Graduate Programs"
  },
  {
    name: "Diploma in Human Resource Management",
    school: "School of Business",
    department: "Department of Management",
    level: "Graduate Programs"
  },
  {
    name: "Diploma in Procurement and Supply Chain Management",
    school: "School of Business",
    department: "Department of Management",
    level: "Graduate Programs"
  },
  {
    name: "Diploma in Secretarial Studies and Office Administration",
    school: "School of Business",
    department: "Department of Management",
    level: "Graduate Programs"
  },
  {
    name: "Bachelor of Science in Food Technology and Human Nutrition",
    school: "School of Agricultural and Applied Science",
    department: "Department of Nutrition, Food Science & Technology",
    level: "Undergraduate Programs"
  },
  {
    name: "Diploma in Food Science and Processing Technology",
    school: "School of Agricultural and Applied Science",
    department: "Department of Nutrition, Food Science & Technology",
    level: "Graduate Programs"
  },
  {
    name: "Bachelor of Science in Agriculture (Crop and Animal)",
    school: "School of Agricultural and Applied Science",
    department: "Department of Agricultural and Environmental Science",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Science in Environmental Science",
    school: "School of Agricultural and Applied Science",
    department: "Department of Agricultural and Environmental Science",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Science in Agribusiness Innovations and Management",
    school: "School of Agricultural and Applied Science",
    department: "Department of Agricultural and Environmental Science",
    level: "Undergraduate Programs"
  },
  {
    name: "Certificate in Agriculture",
    school: "School of Agricultural and Applied Science",
    department: "Department of Agricultural and Environmental Science",
    level: "Short Courses"
  },
  {
    name: "Bachelor of Arts in Community Development",
    school: "School of Social Sciences",
    department: "Department of Development and Humanitarian Studies",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Humanitarian Emergency and Disaster Management",
    school: "School of Social Sciences",
    department: "Department of Development and Humanitarian Studies",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Journalism and Mass Communication",
    school: "School of Social Sciences",
    department: "Department of Development and Humanitarian Studies",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Public Administration and Management",
    school: "School of Social Sciences",
    department: "Department of Development and Humanitarian Studies",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Arts in Development Studies",
    school: "School of Social Sciences",
    department: "Department of Development and Humanitarian Studies",
    level: "Undergraduate Programs"
  },
  {
    name: "Diploma in Public Administration",
    school: "School of Social Sciences",
    department: "Department of Development and Humanitarian Studies",
    level: "Graduate Programs"
  },
  {
    name: "Diploma in Development Studies",
    school: "School of Social Sciences",
    department: "Department of Development and Humanitarian Studies",
    level: "Graduate Programs"
  },
  {
    name: "Bachelor of Science in Psychology and Counselling",
    school: "School of Social Sciences",
    department: "Department of Social Work",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Social Work",
    school: "School of Social Sciences",
    department: "Department of Social Work",
    level: "Undergraduate Programs"
  },
  {
    name: "Diploma in Counselling",
    school: "School of Social Sciences",
    department: "Department of Social Work",
    level: "Graduate Programs"
  },
  {
    name: "Diploma in Social Work",
    school: "School of Social Sciences",
    department: "Department of Social Work",
    level: "Graduate Programs"
  },
  {
    name: "Certificate in Counselling",
    school: "School of Social Sciences",
    department: "Department of Social Work",
    level: "Short Courses"
  },
  {
    name: "Bachelor of Theology",
    school: "School of Theology and Religious Studies",
    department: "Department of Theology",
    level: "Undergraduate Programs"
  },
  {
    name: "Diploma in Theology",
    school: "School of Theology and Religious Studies",
    department: "Department of Theology",
    level: "Graduate Programs"
  },
  {
    name: "Certificate in Theology",
    school: "School of Theology and Religious Studies",
    department: "Department of Theology",
    level: "Short Courses"
  },
  {
    name: "Bachelor of Arts in Religious Studies",
    school: "School of Theology and Religious Studies",
    department: "Department of Religious Studies",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Science with Education - Secondary",
    school: "School of Education",
    department: "Department of Science Education",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor/Diploma in Education (Primary)",
    school: "School of Education",
    department: "Department of Science Education",
    level: "Undergraduate Programs"
  },
  {
    name: "Diploma in Early Childhood Development (ECD)",
    school: "School of Education",
    department: "Department of Science Education",
    level: "Graduate Programs"
  },
  {
    name: "Bachelor of Arts with Education - Secondary",
    school: "School of Education",
    department: "Department of Arts Education",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor in Early Childhood Development (ECD)",
    school: "School of Education",
    department: "Department of Arts Education",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Arts with Education - Primary",
    school: "School of Education",
    department: "Department of Arts Education",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Library and Information Science",
    school: "School of Science and Technology",
    department: "Department of Computing and Informatics",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Information Technology",
    school: "School of Science and Technology",
    department: "Department of Computing and Informatics",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Business Computing",
    school: "School of Science and Technology",
    department: "Department of Computing and Informatics",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Science in Network Systems Administration",
    school: "School of Science and Technology",
    department: "Department of Computing and Informatics",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Science in Applied Data Science and Artificial Intelligence",
    school: "School of Science and Technology",
    department: "Department of Computing and Informatics",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Science in Software Engineering",
    school: "School of Science and Technology",
    department: "Department of Computing and Informatics",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Biochemistry",
    school: "School of Science and Technology",
    department: "Department of Life and Physical Sciences",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Science in Statistics",
    school: "School of Science and Technology",
    department: "Department of Life and Physical Sciences",
    level: "Undergraduate Programs"
  },
  {
    name: "Diploma in Biomedical Engineering and Technology",
    school: "School of Science and Technology",
    department: "Department of Life and Physical Sciences",
    level: "Graduate Programs"
  },
  {
    name: "Diploma in Science Laboratory Technology",
    school: "School of Science and Technology",
    department: "Department of Life and Physical Sciences",
    level: "Graduate Programs"
  },
  {
    name: "Bachelor of Nursing Sciences",
    school: "School of Health and Allied Sciences",
    department: "Department of Nursing",
    level: "Undergraduate Programs"
  },
  {
    name: "Bachelor of Science in Public Health",
    school: "School of Health and Allied Sciences",
    department: "Department of Nursing",
    level: "Undergraduate Programs"
  },
  {
    name: "Diploma in Nursing (Extension)",
    school: "School of Health and Allied Sciences",
    department: "Department of Nursing",
    level: "Graduate Programs"
  },
  {
    name: "Diploma in Nursing (Direct)",
    school: "School of Health and Allied Sciences",
    department: "Department of Nursing",
    level: "Graduate Programs"
  },
  {
    name: "Certificate in Nursing",
    school: "School of Health and Allied Sciences",
    department: "Department of Nursing",
    level: "Short Courses"
  },
  {
    name: "Certificate in Midwifery",
    school: "School of Health and Allied Sciences",
    department: "Department of Nursing",
    level: "Short Courses"
  },
  {
    name: "PhD in Educational Management",
    school: "Graduate Studies and Research",
    department: "Doctorate Programs (PhD)",
    level: "PhD Programs"
  },
  {
    name: "PhD in Environmental Management",
    school: "Graduate Studies and Research",
    department: "Doctorate Programs (PhD)",
    level: "PhD Programs"
  },
  {
    name: "PhD in Rural Development",
    school: "Graduate Studies and Research",
    department: "Doctorate Programs (PhD)",
    level: "PhD Programs"
  },
  {
    name: "Master of Public Health",
    school: "Graduate Studies and Research",
    department: "Masters Programs",
    level: "Masters Programs"
  },
  {
    name: "Master of Public Administration and Management",
    school: "Graduate Studies and Research",
    department: "Masters Programs",
    level: "Masters Programs"
  },
  {
    name: "Master of Social Work",
    school: "Graduate Studies and Research",
    department: "Masters Programs",
    level: "Masters Programs"
  },
  {
    name: "Master of Procurement and Logistics",
    school: "Graduate Studies and Research",
    department: "Masters Programs",
    level: "Masters Programs"
  },
  {
    name: "Master of Project Planning and Management",
    school: "Graduate Studies and Research",
    department: "Masters Programs",
    level: "Masters Programs"
  },
  {
    name: "Master of Science in Sustainable Agribusiness Innovation and Management",
    school: "Graduate Studies and Research",
    department: "Masters Programs",
    level: "Masters Programs"
  },
  {
    name: "Master of Business Administration",
    school: "Graduate Studies and Research",
    department: "Masters Programs",
    level: "Masters Programs"
  },
  {
    name: "Master of Science in Counselling Psychology",
    school: "Graduate Studies and Research",
    department: "Masters Programs",
    level: "Masters Programs"
  },
  {
    name: "Masters in Education Management",
    school: "Graduate Studies and Research",
    department: "Masters Programs",
    level: "Masters Programs"
  },
  {
    name: "Postgraduate Diploma in Information Technology",
    school: "Graduate Studies and Research",
    department: "Postgraduate Diplomas",
    level: "Graduate Programs"
  },
  {
    name: "Postgraduate Diploma in Education",
    school: "Graduate Studies and Research",
    department: "Postgraduate Diplomas",
    level: "Graduate Programs"
  },
  {
    name: "Postgraduate Diploma in Counselling Psychology",
    school: "Graduate Studies and Research",
    department: "Postgraduate Diplomas",
    level: "Graduate Programs"
  },
  {
    name: "Postgraduate Diploma in Public Health",
    school: "Graduate Studies and Research",
    department: "Postgraduate Diplomas",
    level: "Graduate Programs"
  },
  {
    name: "Postgraduate Diploma in Project Planning and Management",
    school: "Graduate Studies and Research",
    department: "Postgraduate Diplomas",
    level: "Graduate Programs"
  },
  {
    name: "Postgraduate Diploma in Clinical Counselling",
    school: "Graduate Studies and Research",
    department: "Postgraduate Diplomas",
    level: "Graduate Programs"
  },
  {
    name: "Postgraduate Diploma in Procurement and Logistics",
    school: "Graduate Studies and Research",
    department: "Postgraduate Diplomas",
    level: "Graduate Programs"
  },
  {
    name: "German language",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Mobile Application Development",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Advanced Computer Repair",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "First Aid and Emergency Response",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Occupational Health and Safety (OHS)",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Paper and Specialized Handcrafts Course",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Textiles and Embroidery Course",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Sustainable Agriculture Practices",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Agribusiness and Value Addition",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Early Childhood Development (ECD)",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Basic Sign Language",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Electrical Installation and Maintenance",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Plumbing and Pipe Fitting",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Catering and Hotel Management",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Travel and Tour Operations",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Photography and Videography",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Music Production and Sound Engineering",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Training Course for Executive Secretarian (front Office Management)",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Effective teams Leadership Course",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Training Course in Office Administration and Management",
    school: "Short Courses",
    department: "Technical & Vocational",
    level: "Short Courses"
  },
  {
    name: "Project Planning & Management",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Strategic Planning & Management",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Basic Monitoring and Evaluation",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Advanced Monitoring and Evaluation",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Customer Relationship Management",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Strategic Marketing Strategies",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Fundamentals of Resource Mobilisation",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Advanced Resource Mobilisation Strategies",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Basic Accounting & Finance",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Financial Reports and Analysis",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Introduction to Procurement & Supply Chain Management",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Effective Recruitment and Talent Acquisition",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Compensation and Benefit Management",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Public service Delivery & Citizen engagement",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Crisis Management and Disaster response in the Public Sector",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "Transformative Leadership Course",
    school: "Short Courses",
    department: "Management & Professional",
    level: "Short Courses"
  },
  {
    name: "International Computer Digital Literacy (ICDL)",
    school: "Short Courses",
    department: "ICDL",
    level: "Short Courses"
  }
];

try {
  await mongoose.connect(process.env.MONGO_URI);

  await Program.deleteMany({});
  const insertedPrograms = await Program.insertMany(programs);

  console.log("Bugema programs seeded successfully");
  console.log(`Seeded ${insertedPrograms.length} programs`);
} catch (error) {
  console.error("Error seeding programs:", error);
} finally {
  await mongoose.connection.close();
  process.exit(0);
}
