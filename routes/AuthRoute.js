// routes/AuthRoute.js
import express from "express";
import { 
    Login, 
    // Me, 
    Logout, 
    ResetPassword } from "../controllers/Auth.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

// router.get("/me", verifyAdmin, Me);
router.post("/login", Login);
router.delete("/logout", verifyAdmin, Logout);
router.post("/reset-password", ResetPassword);

export default router;