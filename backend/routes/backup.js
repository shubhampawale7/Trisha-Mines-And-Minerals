import express from "express";
import fs from "fs";
import path from "path";
import os from "os";
import PDFDocument from "pdfkit";
import User from "../models/User.js";
import Inquiry from "../models/Inquiry.js";
import Gallery from "../models/Gallery.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const format = req.query.format || "json"; // default to json

  try {
    const backupData = {
      users: await User.find(),
      inquiries: await Inquiry.find(),
      gallery: await Gallery.find(),
    };

    if (format === "pdf") {
      const doc = new PDFDocument();
      const filePath = path.join(os.tmpdir(), "database_backup.pdf");
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      doc.fontSize(18).text("Database Backup", { underline: true });
      doc.moveDown();

      for (const [key, value] of Object.entries(backupData)) {
        doc.fontSize(14).text(`${key.toUpperCase()}:`, { bold: true });
        doc.fontSize(10).text(JSON.stringify(value, null, 2));
        doc.moveDown();
      }

      doc.end();

      stream.on("finish", () => {
        res.download(filePath, "database_backup.pdf", (err) => {
          if (err) console.error("Error during download:", err);
          fs.unlink(filePath, () => {}); // Clean up temp file
        });
      });
    } else {
      const json = JSON.stringify(backupData, null, 2);
      const filePath = path.join(os.tmpdir(), "database_backup.json");

      fs.writeFileSync(filePath, json);

      res.download(filePath, "database_backup.json", (err) => {
        if (err) console.error("Error during download:", err);
        fs.unlink(filePath, () => {});
      });
    }
  } catch (err) {
    console.error("Backup error:", err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
