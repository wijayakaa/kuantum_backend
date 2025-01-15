import express from "express";
import { getDesc, updateDesc, createDesc } from "../../controllers/service-development/SiDevelopmentDesc.js";
import { uploadSiSliderInformation, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/si-development-desc", getDesc);
// router.post("/si-development-desc", verifyAdmin, uploadSiSliderInformation.single("image"), validateFileType, createDesc);
router.patch("/si-development-desc/:id", verifyAdmin, uploadSiSliderInformation.single("image"), validateFileType, updateDesc);

export default router;