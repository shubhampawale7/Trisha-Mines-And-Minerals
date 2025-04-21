import express from "express";
import Analytics from "../models/Analytics.js";

const router = express.Router();

// Track a visit
router.post("/", async (req, res) => {
  try {
    const { page } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const referrer = req.headers.referer || "direct";
    const userAgent = req.headers["user-agent"];

    const entry = new Analytics({ page, ip, referrer, userAgent });
    await entry.save();

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to track visit" });
  }
});

// Fetch aggregated analytics
router.get("/stats", async (req, res) => {
  try {
    const stats = await Analytics.aggregate([
      {
        $group: {
          _id: "$page",
          visits: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          page: "$_id",
          visits: 1,
        },
      },
      { $sort: { visits: -1 } },
    ]);

    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
});

// routes/analytics.js
router.post('/track', async (req, res) => {
  try {
    const { page } = req.body;

    if (!page) {
      return res.status(400).json({ error: "Page is required" });
    }

    const existing = await Analytics.findOne({ page });

    if (existing) {
      existing.visits += 1;
      await existing.save();
    } else {
      await Analytics.create({ page, visits: 1 });
    }

    res.status(200).json({ message: "Page visit recorded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
