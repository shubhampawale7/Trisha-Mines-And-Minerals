import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  page: String,
  ip: String,
  userAgent: String,
  referrer: String,

  // New fields
  timeSpent: { type: Number, default: 0 }, // Time spent in seconds
  isReturning: { type: Boolean, default: false }, // For new vs returning users
  location: { type: String, default: "Unknown" }, // Location (e.g., city, country)

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Analytics", analyticsSchema);
