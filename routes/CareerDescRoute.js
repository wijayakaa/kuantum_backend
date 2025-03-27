import express from "express";
import {  getDesc, createDesc, updateDesc, deleteDesc } from "../controllers/CareerDesc.js";
import { uploadCareerSliderInformation, validateFileType } from "../middleware/uploadFile.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/career-slider-desc", getDesc);
// router.post("/api/career-slider-desc", verifyAdmin, uploadCareerSliderInformation.single("image"), validateFileType, createDesc);
router.patch("/api/career-slider-desc/:id", verifyAdmin, uploadCareerSliderInformation.single("image"), updateDesc);
// router.delete("/api/career-slider-desc/:id", verifyAdmin, deleteDesc);

export default router;