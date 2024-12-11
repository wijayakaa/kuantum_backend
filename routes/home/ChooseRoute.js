import express from "express";
import { getChoosen, createChoosen, updateChoosen, deleteChoosen } from "../../controllers/home/Choose.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/choose-us", getChoosen);
router.post("/choose-us", verifyAdmin, createChoosen);
router.patch("/choose-us/:id", verifyAdmin,updateChoosen);
router.delete("/choose-us/:id", verifyAdmin,deleteChoosen);

export default router;