import express from "express";
import { getChoosen, createChoosen, updateChoosen, deleteChoosen } from "../../controllers/home/Choose.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/choose-us", getChoosen);
router.post("/api/choose-us", verifyAdmin, createChoosen);
router.patch("/api/choose-us/:id", verifyAdmin,updateChoosen);
router.delete("/api/choose-us/:id", verifyAdmin,deleteChoosen);

export default router;