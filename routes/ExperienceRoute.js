import express from "express";
import { getExperience,createExperience, updateExperience, deleteExperience } from "../controllers/Experience.js";
import { uploadExperience, validateFileType } from "../middleware/uploadFile.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/experience", getExperience);
router.post("/api/experience", verifyAdmin, uploadExperience.single("image"), validateFileType, createExperience);
router.patch("/api/experience/:id", verifyAdmin, uploadExperience.single("image"), validateFileType, updateExperience);
router.delete("/api/experience/:id", verifyAdmin, deleteExperience);

export default router;