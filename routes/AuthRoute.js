import express from "express";
import {
    Login,
    Logout,
    ResetPassword
} from "../controllers/Auth.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/api/login", Login);
router.delete("/api/logout", verifyAdmin, Logout);
router.patch("/api/reset-password",verifyAdmin, ResetPassword);

export default router;