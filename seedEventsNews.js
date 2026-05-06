import dotenv from "dotenv";
import mongoose from "mongoose";
import Event from "./models/eventModel.js";
import News from "./models/newsModel.js";

dotenv.config();

const events = [
  {
    title: "End of Semester Exams",
    date: "13 May 2026",
    time: "To be communicated",
    location: "Main Campus",
    description: "End of semester examination period for Bugema University students.",
    image: "End of Semester Exams.png"
  },
  {
    title: "Commissioning the Science Complex",
    date: "26 April 2026",
    time: "To be communicated",
    location: "Bugema University Main Campus",
    description: "Official commissioning of the Science Complex at Bugema University.",
    image: "Commissioning Science Complex.png"
  },
  {
    title: "End of Semester Exams Orientation",
    date: "28 April 2026",
    time: "To be communicated",
    location: "Main Campus",
    description: "Orientation session to prepare students for the end of semester examinations.",
    image: "End of Semester Orientation.png"
  }
];

const newsItems = [
  {
    title: "A Night of Royalty and Rhythm: Bugema University Welcomes Freshers with NRG Radio Partnership",
    date: "16 March 2026",
    summary: "Bugema University welcomed freshers in a vibrant event supported through a partnership with NRG Radio.",
    link: "https://bugemauniv.ac.ug/a-night-of-royalty-and-rhythm-bugema-university-welcomes-freshers-with-nrg-radio-partnership/",
    image: "Freshers ball-Night of Rhythm.png"
  },
  {
    title: "Bugema University Celebrates Historic Victory at World University Cross Country Championships",
    date: "11 March 2026",
    summary: "Bugema University celebrated a historic sporting achievement at the World University Cross Country Championships.",
    link: "https://bugemauniv.ac.ug/bugema-university-celebrates-historic-victory-at-world-university-cross-country-championships/",
    image: "Cross Country Champions.png"
  },
  {
    title: "Trailblazing Public Health Leadership: A Transformational Milestone for Bugema University",
    date: "9 February 2026",
    summary: "Bugema University marked an important milestone in public health leadership and academic growth.",
    link: "https://bugemauniv.ac.ug/trailblazing-public-health-leadership-a-transformational-milestone-for-bugema-university/",
    image: "Trailblazing Puplic Health.png"
  },
  {
    title: "Bugema University Hospital Hosts Free Medical Camp in Collaboration with Overseas Medical Volunteers",
    date: "2 January 2026",
    summary: "Bugema University Hospital hosted a free medical camp in collaboration with overseas medical volunteers.",
    link: "https://bugemauniv.ac.ug/bugema-university-hospital-hosts-free-medical-camp-in-collaboration-with-overseas-medical-volunteers/",
    image: "Free Medical Camp.png"
  }
];

try {
  await mongoose.connect(process.env.MONGO_URI);

  await Event.deleteMany({});
  await News.deleteMany({});

  await Event.insertMany(events);
  await News.insertMany(newsItems);

  console.log("Events and news seeded successfully.");
} catch (error) {
  console.error("Error seeding events and news:", error);
} finally {
  await mongoose.connection.close();
  process.exit(0);
}
