import Inquiry from "../models/Inquiry.js";
export const createInquiry = async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({ message: "Failed to retrieve inquiries" });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Inquiry deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting inquiry" });
  }
};

export const updateInquiryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["New", "Replied"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!inquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Inquiry not found" });
    }
    res.status(200).json({ success: true, inquiry });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update status", error });
  }
};
