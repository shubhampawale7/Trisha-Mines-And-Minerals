import Analytics from "../models/Analytics.js";
import geoip from "geoip-lite";

// Get IP address from headers or connection
const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  return forwarded ? forwarded.split(",")[0] : req.connection.remoteAddress;
};

// POST /api/analytics/track
export const trackVisit = async (req, res) => {
  try {
    const { page, timeSpent } = req.body;

    const ip = getClientIp(req);
    const userAgent = req.get("User-Agent") || "Unknown";
    const referrer = req.get("Referer") || "Direct";

    // Get location
    const geo = geoip.lookup(ip);
    const location = geo
      ? `${geo.city || "Unknown"}, ${geo.country || "Unknown"}`
      : "Unknown";

    // Determine if user is returning based on IP (basic logic)
    const isReturning = await Analytics.exists({ ip });

    // Save analytics record
    const newAnalytics = new Analytics({
      page,
      ip,
      userAgent,
      referrer,
      timeSpent,
      location,
      isReturning,
    });

    await newAnalytics.save();
    res.status(201).json({ message: "Visit tracked" });
  } catch (err) {
    console.error("Error tracking visit:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/analytics/stats
export const getStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const analytics = await Analytics.find(query);

    // Group and compute stats by page
    const stats = analytics.reduce((acc, entry) => {
      const key = entry.page;
      if (!acc[key]) {
        acc[key] = {
          page: entry.page,
          visits: 0,
          totalTime: 0,
          location: entry.location,
          isReturning: entry.isReturning,
          timestamp: entry.timestamp,
        };
      }
      acc[key].visits += 1;
      acc[key].totalTime += entry.timeSpent;
      return acc;
    }, {});

    const formattedStats = Object.values(stats).map((s) => ({
      ...s,
      avgTimeSpent: Math.round(s.totalTime / s.visits),
    }));

    res.json(formattedStats);
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};
