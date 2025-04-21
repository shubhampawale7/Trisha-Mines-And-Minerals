import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Admin Registration
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await User.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new User({ username, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
 
// Admin Login
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", username, password);
    const user = await User.findOne({ username });
    console.log("Fetched user:", user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // session expiry
    });
    console.log("Generated JWT:", token);

    // Set token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure in production
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: "lax",
    });
    console.log("Login successful");
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Admin Logout
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// Check Auth (for session persistence)
export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ loggedIn: true, username: user.username, role: user.role });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
