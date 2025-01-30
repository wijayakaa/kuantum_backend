import express from "express";
import {  getDesc, createDesc, updateDesc, deleteDesc } from "../controllers/ExperienceDesc.js";
import { uploadExperienceSliderInformation, validateFileType } from "../middleware/uploadFile.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/experience-development-desc", getDesc);
// router.post("/api/experience-development-desc", verifyAdmin, uploadExperienceSliderInformation.single("image"), validateFileType, createDesc);
router.patch("/api/experience-development-desc/:id", verifyAdmin, uploadExperienceSliderInformation.single("image"), validateFileType, updateDesc);
// router.delete("/api/experience-development-desc/:id", verifyAdmin, deleteDesc);

export default router;