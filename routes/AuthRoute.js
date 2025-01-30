// routes/AuthRoute.js
import express from "express";
import { 
    Login, 
    // Me, 
    Logout, 
    ResetPassword } from "../controllers/Auth.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

// router.get("/api/me", verifyAdmin, Me);
router.post("/api/login", Login);
router.delete("/api/logout", verifyAdmin, Logout);
router.post("/api/reset-password", ResetPassword);

export default router;