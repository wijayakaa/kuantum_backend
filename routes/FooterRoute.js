import express from "express";
import { getFooter, createFooter, updateFooter, deleteFooter } from "../controllers/Footer.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/footer-information", getFooter);
router.post("/footer-information", verifyAdmin, createFooter);
router.patch("/footer-information/:id", verifyAdmin,updateFooter);
router.delete("/footer-information/:id", verifyAdmin,deleteFooter);

export default router;