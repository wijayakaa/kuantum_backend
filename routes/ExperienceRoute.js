import express from "express";
import { getExperience,createExperience, updateExperience, deleteExperience } from "../controllers/Experience.js";
import { uploadExperience, validateFileType } from "../middleware/uploadFile.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/experience", getExperience);
router.post("/experience", verifyAdmin, uploadExperience.single("image"), validateFileType, createExperience);
router.patch("/experience/:id", verifyAdmin, uploadExperience.single("image"), validateFileType, updateExperience);
router.delete("/experience/:id", verifyAdmin, deleteExperience);

export default router;