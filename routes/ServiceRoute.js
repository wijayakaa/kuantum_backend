import express from "express";
// import { getSolution,createSolution,updateSolution,deleteSolution } from "../controllers/Solution.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/service", getSolution);
router.post("/service", verifyAdmin, createSolution);
router.patch("/service/:id", updateSolution);
router.delete("/service/:id", verifyAdmin, deleteSolution);

export default router;