import express from "express";
import { getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/Product.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/product", getProduct);
// router.get("/product/:id", getProductById);
router.post("/product", verifyAdmin, createProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", verifyAdmin, deleteProduct);

export default router;