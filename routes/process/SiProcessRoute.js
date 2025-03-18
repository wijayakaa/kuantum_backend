import express from "express";
import { getProcess, createProcess, updateProcess, deleteProcess } from "../../controllers/process/SiProcess.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/si-development-process", getProcess);
router.post("/api/si-development-process", verifyAdmin, createProcess);
router.patch("/api/si-development-process/:id", verifyAdmin,updateProcess);
router.delete("/api/si-development-process/:id", verifyAdmin,deleteProcess);

export default router;