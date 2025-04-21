import express from "express";
import { sendEmail } from "../utils/sendEmail.js"; // adjust path if needed

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const result = await sendEmail({ email, subject, message });

  if (result.success) {
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } else {
    res.status(500).json({
      success: false,
      message: "Email failed to send",
      error: result.error,
    });
  }
});

export default router;
