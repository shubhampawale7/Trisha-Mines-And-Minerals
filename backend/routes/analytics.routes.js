import express from "express";
import { trackVisit, getStats } from "../controllers/analytics.controller.js";

const router = express.Router();

router.post("/track", trackVisit); // POST visit tracking
router.get("/stats", getStats); // GET analytics data for admin dashboard

export default router;
