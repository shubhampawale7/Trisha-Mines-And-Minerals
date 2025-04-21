import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js"; // Ensure this middleware exists
import User from "../models/User.js";

const router = express.Router();

// Example Admin Dashboard Route
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    res.json({ message: "Welcome to the Admin Dashboard", user });
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
