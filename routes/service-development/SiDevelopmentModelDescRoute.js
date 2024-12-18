import express from "express";
import { getDesc, updateDesc,createDesc } from "../../controllers/service-development/SiDevelopmentDesc.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/si-development-desc", getDesc);
router.post("/si-development-desc", verifyAdmin,createDesc);
router.patch("/si-development-desc/:id", verifyAdmin,updateDesc);

export default router;