import express from "express";
import Admission from "../models/admissionModel.js";
import QuickApply from "../models/quickApplyModel.js";
import ScholarshipApplication from "../models/scholarshipModel.js";
import BursaryApplication from "../models/bursaryModel.js";
import WorkApplication from "../models/workApplicationModel.js";
import Feedback from "../models/feedbackModel.js";

const router = express.Router();

const defaultSummary = {
  totalAdmissions: 0,
  totalQuickApplies: 0,
  totalScholarships: 0,
  totalBursaries: 0,
  totalWorkApplications: 0,
  totalFeedback: 0,
  totalApplications: 0,
  pendingReview: 0,
  approved: 0,
  averageRating: 0,
  topMarketingSource: "No data"
};

router.get("/admin", async (req, res) => {
  try {
    const [
      totalAdmissions,
      totalQuickApplies,
      totalScholarships,
      totalBursaries,
      totalWorkApplications,
      totalFeedback,
      pendingScholarships,
      pendingBursaries,
      pendingWorkApplications,
      approvedScholarships,
      approvedBursaries,
      approvedWorkApplications,
      ratingStats,
      sourceStats
    ] = await Promise.all([
      Admission.countDocuments(),
      QuickApply.countDocuments(),
      ScholarshipApplication.countDocuments(),
      BursaryApplication.countDocuments(),
      WorkApplication.countDocuments(),
      Feedback.countDocuments(),
      ScholarshipApplication.countDocuments({ status: "Pending" }),
      BursaryApplication.countDocuments({ status: "Pending" }),
      WorkApplication.countDocuments({ status: "Pending" }),
      ScholarshipApplication.countDocuments({ status: "Approved" }),
      BursaryApplication.countDocuments({ status: "Approved" }),
      WorkApplication.countDocuments({ status: "Approved" }),
      Feedback.aggregate([
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$rating" }
          }
        }
      ]),
      Feedback.aggregate([
        {
          $group: {
            _id: "$source",
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 1 }
      ])
    ]);

    const totalApplications =
      totalAdmissions +
      totalQuickApplies +
      totalScholarships +
      totalBursaries +
      totalWorkApplications;

    const summary = {
      totalAdmissions,
      totalQuickApplies,
      totalScholarships,
      totalBursaries,
      totalWorkApplications,
      totalFeedback,
      totalApplications,
      pendingReview: pendingScholarships + pendingBursaries + pendingWorkApplications,
      approved: approvedScholarships + approvedBursaries + approvedWorkApplications,
      averageRating: ratingStats[0]?.averageRating ? ratingStats[0].averageRating.toFixed(1) : 0,
      topMarketingSource: sourceStats[0]?._id || "No data"
    };

    res.render("admin/dashboard", { summary, activePage: "dashboard" });
  } catch (error) {
    console.error("Error loading admin dashboard:", error);
    res.status(500).render("admin/dashboard", {
      summary: defaultSummary,
      activePage: "dashboard",
      errorMessage: "Unable to load dashboard summary data."
    });
  }
});

router.get("/admin/applications", async (req, res) => {
  try {
    const [
      admissions,
      quickApplies,
      scholarships,
      bursaries,
      workApplications
    ] = await Promise.all([
      Admission.find().sort({ createdAt: -1 }).lean(),
      QuickApply.find().sort({ createdAt: -1 }).lean(),
      ScholarshipApplication.find().sort({ createdAt: -1 }).lean(),
      BursaryApplication.find().sort({ createdAt: -1 }).lean(),
      WorkApplication.find().sort({ createdAt: -1 }).lean()
    ]);

    res.render("admin/applications", {
      admissions,
      quickApplies,
      scholarships,
      bursaries,
      workApplications,
      activePage: "applications"
    });
  } catch (error) {
    console.error("Error loading admin applications:", error);
    res.status(500).render("admin/applications", {
      admissions: [],
      quickApplies: [],
      scholarships: [],
      bursaries: [],
      workApplications: [],
      activePage: "applications",
      errorMessage: "Unable to load applications data."
    });
  }
});

router.get("/admin/feedback", async (req, res) => {
  try {
    const feedbackRecords = await Feedback.find().sort({ createdAt: -1 }).lean();

    res.render("admin/feedback", {
      feedbackRecords,
      activePage: "feedback"
    });
  } catch (error) {
    console.error("Error loading admin feedback:", error);
    res.status(500).render("admin/feedback", {
      feedbackRecords: [],
      activePage: "feedback",
      errorMessage: "Unable to load feedback data."
    });
  }
});

router.get("/admin/analytics", async (req, res) => {
  try {
    const [totalFeedback, ratingStats, sourceCounts] = await Promise.all([
      Feedback.countDocuments(),
      Feedback.aggregate([
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$rating" }
          }
        }
      ]),
      Feedback.aggregate([
        {
          $group: {
            _id: "$source",
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ])
    ]);

    const analytics = {
      totalFeedback,
      averageRating: ratingStats[0]?.averageRating ? ratingStats[0].averageRating.toFixed(1) : 0,
      topMarketingSource: sourceCounts[0]?._id || "No data",
      sourceCounts: sourceCounts.map((source) => ({
        source: source._id || "Unknown",
        count: source.count,
        percentage: totalFeedback > 0 ? Math.round((source.count / totalFeedback) * 100) : 0
      }))
    };

    res.render("admin/analytics", {
      analytics,
      activePage: "analytics"
    });
  } catch (error) {
    console.error("Error loading admin analytics:", error);
    res.status(500).render("admin/analytics", {
      analytics: {
        totalFeedback: 0,
        averageRating: 0,
        topMarketingSource: "No data",
        sourceCounts: []
      },
      activePage: "analytics",
      errorMessage: "Unable to load marketing analytics."
    });
  }
});

export default router;
