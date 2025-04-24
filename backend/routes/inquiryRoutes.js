import express from "express";
import {
  createInquiry,
  deleteInquiry,
  getAllInquiries,
} from "../controllers/inquiryController.js";
import { updateInquiryStatus } from "../controllers/inquiryController.js";
const router = express.Router();

// POST /api/inquiries - Create new inquiry
router.post("/", createInquiry);

// GET /api/inquiries - Get all inquiries
router.get("/", getAllInquiries);

router.delete("/:id", deleteInquiry);

router.patch("/:id/status", updateInquiryStatus);
export default router;
