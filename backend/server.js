import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import User from "./models/User.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contact.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import sendEmailRoute from "./routes/sendEmailRoute.js";

import backupRoutes from "./routes/backup.js";
import nodemailer from "nodemailer";
import setupAdminRoute from "./routes/setupAdmin.js";
import adminStatsRoutes from "./routes/adminStats.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true, // Allow cookies
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/setup-admin", setupAdminRoute);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api", adminRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api", sendEmailRoute);

app.use("/api/backup", backupRoutes);
app.use("/api/admin", adminStatsRoutes);

// ✅ Protected Route: Check logged-in user
app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ role: user.role });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/admin-dashboard", async (req, res) => {
  try {
    const data = { message: "Admin dashboard data" };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Trishha Mines & Minerals LLP" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
