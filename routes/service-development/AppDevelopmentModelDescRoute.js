import express from "express";
import {  getDesc, createDesc, updateDesc, deleteDesc } from "../../controllers/service-development/AppDevelopmentDesc.js";
import { uploadAppSliderInformation, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/app-development-desc", getDesc);
// router.post("/api/app-development-desc", verifyAdmin, uploadAppSliderInformation.single("image"), validateFileType, createDesc);
router.put("/api/app-development-desc/:id", verifyAdmin, 
    uploadAppSliderInformation.single("image"), validateFileType, 
    updateDesc);
// router.delete("/api/app-development-desc/:id", verifyAdmin, deleteDesc);

export default router;