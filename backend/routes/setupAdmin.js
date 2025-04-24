import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    // Check if admin already exists
    const existingAdmins = await User.find({ role: "admin" });

    if (existingAdmins.length > 0) {
      return res.status(403).json({ message: "Admin already exists" });
    }

    // Create a new admin user
    const newAdmin = new User({
      username, // Ensure username is included here
      email,
      password,
      role: "admin",
    });

    res.status(201).json({ message: "✅ Admin created successfully" });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
});

export default router;
