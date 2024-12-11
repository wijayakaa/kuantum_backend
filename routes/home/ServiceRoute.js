import express from "express";
import { getService,createService,updateService,deleteService} from "../../controllers/home/Service.js"
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/service", getService);
router.post("/service", verifyAdmin, createService);
router.patch("/service/:id", verifyAdmin,updateService);
router.delete("/service/:id", verifyAdmin, deleteService);

export default router;