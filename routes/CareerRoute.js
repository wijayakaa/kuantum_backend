import express from "express";
import { getCareer, createCareer, updateCareer, deleteCareer,  } from "../controllers/Career.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/career",getCareer );
router.post("/api/career", verifyAdmin, createCareer);
router.patch("/api/career/:id", verifyAdmin, updateCareer);
router.delete("/api/career/:id", verifyAdmin, deleteCareer);

export default router;