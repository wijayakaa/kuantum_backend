import express from "express";
import { getDesc, updateDesc,createDesc,} from "../../controllers/service-development/SiDevelopmentDesc.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/web-development-desc", getDesc);
router.post("/web-development-desc", verifyAdmin,createDesc);
router.patch("/web-development-desc/:id", verifyAdmin,updateDesc);

export default router;