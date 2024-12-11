import express from "express";
import { getProcess, createProcess, updateProcess, deleteProcess } from "../../controllers/process/SiProcess.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/si-development-process", getProcess);
router.post("/si-development-process", verifyAdmin, createProcess);
router.patch("/si-development-process/:id", verifyAdmin,updateProcess);
router.delete("/si-development-process/:id", verifyAdmin,deleteProcess);

export default router;