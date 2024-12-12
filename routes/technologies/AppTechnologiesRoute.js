import express from "express";
import { getTechnologies, createTechnologies, updateTechnologies, deleteTechnologies } from "../../controllers/technologies/AppTechnologies.js";
import { uploadAppTechnologies, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/app-technologies", getTechnologies);
router.post("/app-technologies", verifyAdmin, uploadAppTechnologies.single("logo"), validateFileType, createTechnologies);
router.patch("/app-technologies/:id", verifyAdmin, uploadAppTechnologies.single("logo"), validateFileType, updateTechnologies);
router.delete("/app-technologies/:id", verifyAdmin, deleteTechnologies);

export default router;
