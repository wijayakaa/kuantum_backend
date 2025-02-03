import express from "express";
import {getUsers,getUserById,createUser} from "../controllers/User.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/users", verifyAdmin, getUsers);
// router.get("/api/users/:id", verifyAdmin, getUserById);
router.post("/api/users", verifyAdmin,createUser);

export default router;