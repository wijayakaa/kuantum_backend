import express from "express";
import {getSlider, createSlider, updateSlider, deleteSlider} from "../../controllers/home/Slider.js";
import { uploadSlider, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/slider",getSlider );
router.post("/slider", verifyAdmin, uploadSlider.single("image"), validateFileType, createSlider);
router.patch("/slider/:id", verifyAdmin, uploadSlider.single("image"), validateFileType,updateSlider )
router.delete("/slider/:id", verifyAdmin,deleteSlider );

export default router;
