import express from "express";
import multer from 'multer';
import {getSlider, createSlider, updateSlider, deleteSlider} from "../../controllers/home/Slider.js";
import { uploadSlider, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/api/slider",getSlider );
router.post("/api/slider", verifyAdmin, uploadSlider.single("image"), validateFileType, createSlider);
router.patch("/api/slider/:id", verifyAdmin, uploadSlider.single("image"), validateFileType,updateSlider )
router.delete("/api/slider/:id", verifyAdmin,deleteSlider );

export default router;  