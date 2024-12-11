import express from "express";
import { getProcess, createProcess, updateProcess, deleteProcess } from "../../controllers/process/WebProcess.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/web-development-process", getProcess);
router.post("/web-development-process", verifyAdmin, createProcess);
router.patch("/web-development-process/:id", verifyAdmin,updateProcess);
router.delete("/web-development-process/:id", verifyAdmin,deleteProcess);

export default router;