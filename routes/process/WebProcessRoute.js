import express from "express";
import { getProcess, createProcess, updateProcess, deleteProcess } from "../../controllers/process/WebProcess.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/web-development-process", getProcess);
router.post("/api/web-development-process", verifyAdmin, createProcess);
router.patch("/api/web-development-process/:id", verifyAdmin,updateProcess);
router.delete("/api/web-development-process/:id", verifyAdmin,deleteProcess);

export default router;