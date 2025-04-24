// File: routes/adminStats.js
import express from "express";
import Inquiry from "../models/Inquiry.js";
import Gallery from "../models/Gallery.js";
import User from "../models/User.js";

const router = express.Router();

// GET /api/admin/stats
router.get("/stats", async (req, res) => {
  try {
    const [inquiryCount, galleryCount, userCount] = await Promise.all([
      Inquiry.countDocuments(),
      Gallery.countDocuments(),
      User.countDocuments(),
    ]);

    res.json({
      inquiries: inquiryCount,
      galleryImages: galleryCount,
      users: userCount,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/admin/recent-activity
router.get("/recent-activity", async (req, res) => {
  try {
    const [recentInquiries, recentGallery, recentUsers] = await Promise.all([
      Inquiry.find().sort({ createdAt: -1 }).limit(5),
      Gallery.find().sort({ uploadedAt: -1 }).limit(5),
      User.find().sort({ createdAt: -1 }).limit(5).select("-password"),
    ]);

    res.json({
      recentInquiries,
      recentGallery,
      recentUsers,
    });
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
