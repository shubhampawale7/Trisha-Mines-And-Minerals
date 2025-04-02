import express from "express";
import { registerAdmin, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerAdmin); // Create Admin
router.post("/login", loginUser); // Admin Login

export default router;
