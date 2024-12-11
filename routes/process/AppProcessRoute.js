import express from "express";
import { getProcess, createProcess, updateProcess, deleteProcess } from "../../controllers/process/AppProcess.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/app-development-process", getProcess);
router.post("/app-development-process", verifyAdmin, createProcess);
router.patch("/app-development-process/:id", verifyAdmin,updateProcess);
router.delete("/app-development-process/:id", verifyAdmin,deleteProcess);

export default router;