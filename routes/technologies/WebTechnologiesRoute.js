import express from "express";
import { getTechnologies, createTechnologies, updateTechnologies, deleteTechnologies } from "../../controllers/technologies/WebTechnologies.js";
import { uploadWebTechnologies, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/app-technologies", getTechnologies);
router.post("/app-technologies", verifyAdmin, uploadWebTechnologies.single("logo"), validateFileType, createTechnologies);
router.patch("/app-technologies/:id", verifyAdmin, uploadWebTechnologies.single("logo"), validateFileType, updateTechnologies);
router.delete("/app-technologies/:id", verifyAdmin, deleteTechnologies);

export default router;
