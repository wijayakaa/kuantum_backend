import express from "express";
import { getSolution,createSolution,updateSolution,deleteSolution } from "../../controllers/home/Solution.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/solution", getSolution);
router.post("/api/solution", verifyAdmin, createSolution);
router.patch("/api/solution/:id", verifyAdmin,updateSolution);
router.delete("/api/solution/:id", verifyAdmin, deleteSolution);

export default router;