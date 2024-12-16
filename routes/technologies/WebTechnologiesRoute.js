import express from "express";
import { getTechnologies, createTechnologies, updateTechnologies, deleteTechnologies } from "../../controllers/technologies/WebTechnologies.js";
import { uploadWebTechnologies, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/web-technologies", getTechnologies);
router.post("/web-technologies", verifyAdmin, uploadWebTechnologies.single("logo"), validateFileType, createTechnologies);
router.patch("/web-technologies/:id", verifyAdmin, uploadWebTechnologies.single("logo"), validateFileType, updateTechnologies);
router.delete("/web-technologies/:id", verifyAdmin, deleteTechnologies);

export default router;