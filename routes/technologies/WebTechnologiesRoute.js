import express from "express";
import { getTechnologies, createTechnologies, updateTechnologies, deleteTechnologies } from "../../controllers/technologies/WebTechnologies.js";
import { uploadWebTechnologies, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/web-technologies", getTechnologies);
router.post("/api/web-technologies", verifyAdmin, uploadWebTechnologies.single("logo"), validateFileType, createTechnologies);
router.patch("/api/web-technologies/:id", verifyAdmin, uploadWebTechnologies.single("logo"), updateTechnologies);
router.delete("/api/web-technologies/:id", verifyAdmin, deleteTechnologies);

export default router;