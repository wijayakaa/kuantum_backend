import express from "express";
import { getTechnologies, createTechnologies, updateTechnologies, deleteTechnologies } from "../../controllers/technologies/AppTechnologies.js";
import { uploadAppTechnologies, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/app-technologies", getTechnologies);
router.post("/api/app-technologies", verifyAdmin, uploadAppTechnologies.single("logo"), validateFileType, createTechnologies);
router.patch("/api/app-technologies/:id", verifyAdmin, uploadAppTechnologies.single("logo"), updateTechnologies);
router.delete("/api/app-technologies/:id", verifyAdmin, deleteTechnologies);

export default router;