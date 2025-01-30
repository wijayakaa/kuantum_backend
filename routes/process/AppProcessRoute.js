import express from "express";
import { getProcess, createProcess, updateProcess, deleteProcess } from "../../controllers/process/AppProcess.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/app-development-process", getProcess);
router.post("/api/app-development-process", verifyAdmin, createProcess);
router.patch("/api/app-development-process/:id", verifyAdmin,updateProcess);
router.delete("/api/app-development-process/:id", verifyAdmin,deleteProcess);

export default router;