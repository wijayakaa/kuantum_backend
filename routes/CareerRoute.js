import express from "express";
import { getCareer, createCareer, updateCareer, deleteCareer,  } from "../controllers/Career.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/career",getCareer );
router.post("/career", verifyAdmin, createCareer);
router.patch("/career/:id", verifyAdmin, updateCareer);
router.delete("/career/:id", verifyAdmin, deleteCareer);

export default router;