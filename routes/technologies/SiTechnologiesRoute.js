import express from "express";
import { getTechnologies, createTechnologies, updateTechnologies, deleteTechnologies } from "../../controllers/technologies/SiTechnologies.js";
import { uploadSiTechnologies, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/si-technologies", getTechnologies);
router.post("/si-technologies", verifyAdmin, uploadSiTechnologies.single("logo"), validateFileType, createTechnologies);
router.patch("/si-technologies/:id", verifyAdmin, uploadSiTechnologies.single("logo"), validateFileType, updateTechnologies);
router.delete("/si-technologies/:id", verifyAdmin, deleteTechnologies);

export default router;
