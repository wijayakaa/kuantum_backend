import express from "express";
import {  getDesc, createDesc, updateDesc, deleteDesc } from "../../controllers/service-development/AppDevelopmentDesc.js";
import { uploadAppSliderInformation, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/app-development-desc", getDesc);
router.post("/app-development-desc", verifyAdmin, uploadAppSliderInformation.single("image"), validateFileType, createDesc);
router.patch("/app-development-desc/:id", verifyAdmin, uploadAppSliderInformation.single("image"), validateFileType, updateDesc);
router.delete("/app-development-desc/:id", verifyAdmin, deleteDesc);

export default router;