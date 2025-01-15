import express from "express";
import {  getDesc, createDesc, updateDesc, deleteDesc } from "../controllers/CareerDesc.js";
import { uploadCareerSliderInformation, validateFileType } from "../middleware/uploadFile.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/career-slider-desc", getDesc);
// router.post("/career-slider-desc", verifyAdmin, uploadCareerSliderInformation.single("image"), validateFileType, createDesc);
router.patch("/career-slider-desc/:id", verifyAdmin, uploadCareerSliderInformation.single("image"), validateFileType, updateDesc);
// router.delete("/career-slider-desc/:id", verifyAdmin, deleteDesc);

export default router;