import express from "express";
import { getDesc, updateDesc, createDesc, } from "../../controllers/service-development/WebAppDevelopmentDesc.js";
import { uploadWebSliderInformation, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/web-development-desc", getDesc);
router.post("/web-development-desc", verifyAdmin, uploadWebSliderInformation.single("image"), validateFileType, createDesc);
router.patch("/web-development-desc/:id", verifyAdmin, uploadWebSliderInformation.single("image"), validateFileType, updateDesc);

export default router;