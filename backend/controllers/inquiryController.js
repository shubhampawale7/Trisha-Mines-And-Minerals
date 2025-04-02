import Inquiry from "../models/Inquiry.js";
export const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const inquiry = new Inquiry({ name, email, message });
    await inquiry.save();
    res.status(201).json({ message: "Inquiry saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
