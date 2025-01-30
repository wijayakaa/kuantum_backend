import express from "express";
import { getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/Product.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/product", getProduct);
// router.get("/api/product/:id", getProductById);
router.post("/api/product", verifyAdmin, createProduct);
router.patch("/api/product/:id", verifyAdmin,updateProduct);
router.delete("/api/product/:id", verifyAdmin, deleteProduct);

export default router;