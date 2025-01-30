import express from "express";
import { getFooter, createFooter, updateFooter, deleteFooter } from "../controllers/Footer.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/footer-information", getFooter);
router.post("/api/footer-information", verifyAdmin, createFooter);
router.patch("/api/footer-information/:id", verifyAdmin,updateFooter);
router.delete("/api/footer-information/:id", verifyAdmin,deleteFooter);

export default router;