import express from "express";
import { getService,createService,updateService,deleteService} from "../../controllers/home/Service.js"
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/service", getService);
router.post("/api/service", verifyAdmin, createService);
router.patch("/api/service/:id", verifyAdmin,updateService);
router.delete("/api/service/:id", verifyAdmin, deleteService);

export default router;