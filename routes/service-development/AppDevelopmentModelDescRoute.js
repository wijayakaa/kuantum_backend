import express from "express";
import { getDesc, updateDesc,createDesc } from "../../controllers/service-development/AppDevelopmentDesc.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/app-development-desc", getDesc);
router.post("/app-development-desc", verifyAdmin,createDesc);
router.patch("/app-development-desc/:id", verifyAdmin,updateDesc);

export default router;