import express from "express";
import {
  registerAdmin,
  loginUser,
  logoutUser,
  checkAuth,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", checkAuth); // 🔐

export default router;
