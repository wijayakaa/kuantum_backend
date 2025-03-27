import express from "express";
import { getTechnologies, createTechnologies, updateTechnologies, deleteTechnologies } from "../../controllers/technologies/SiTechnologies.js";
import { uploadSiTechnologies, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/si-technologies", getTechnologies);
router.post("/api/si-technologies", verifyAdmin, uploadSiTechnologies.single("logo"), validateFileType, createTechnologies);
router.patch("/api/si-technologies/:id", verifyAdmin, uploadSiTechnologies.single("logo"), updateTechnologies);
router.delete("/api/si-technologies/:id", verifyAdmin, deleteTechnologies);

export default router;