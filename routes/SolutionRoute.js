import express from "express";
import { getSolution,createSolution,updateSolution,deleteSolution } from "../controllers/Solution.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/solution", getSolution);
router.post("/solution", verifyAdmin, createSolution);
router.patch("/solution/:id", verifyAdmin,updateSolution);
router.delete("/solution/:id", verifyAdmin, deleteSolution);

export default router;