import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Received request to create admin:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    // Check if admin already exists
    const existingAdmins = await User.find({ role: "admin" });
    console.log("Existing admins:", existingAdmins);

    if (existingAdmins.length > 0) {
      console.log("Admin already exists");
      return res.status(403).json({ message: "Admin already exists" });
    }

    // Hash the password
    console.log("Hashing password for:", email);

    // Create a new admin user
    const newAdmin = new User({
      username, // Ensure username is included here
      email,
      password,
      role: "admin",
    });

    console.log("Saving new admin:", newAdmin);
    await newAdmin.save();

    res.status(201).json({ message: "✅ Admin created successfully" });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
});

export default router;
