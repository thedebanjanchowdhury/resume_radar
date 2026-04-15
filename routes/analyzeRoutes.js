import express from "express";

import { apiMiddleware } from "../middlewares/apiMiddleWare.js";
import { extractRawTextFromPDF } from "../services/pdfService.js";
import { generateDetails } from "../services/generateDetails.js";
import { upload } from "../middlewares/multer.js";
import Resume from "../models/Resume.js";

const router = express.Router();

router.post(
  "/upload-cv",
  apiMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const buffer = req.file.buffer;
      if (!buffer)
        return res.status(400).json({ message: "No file uploaded!" });

      const rawText = await extractRawTextFromPDF(buffer);
      let result = (await generateDetails(rawText)).content;
      result = JSON.parse(result);

      const resultToStore = {
        name: result.name,
        email: result.email,
        phone: result.phone,
        skills: result.skills,
        experience: result.experience,
        education: result.education,
      };

      const resumeStore = new Resume({
        user_token: req.token,
        ...resultToStore,
        rawText: rawText,
      });
      await resumeStore.save();

      res.status(200).json({
        message: "CV processed and stored successfully!",
        data: resultToStore,
        summary: result.summary,
      });
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      return res.status(500).json({ message: "Error processing PDF file." });
    }
  },
);

export default router;
