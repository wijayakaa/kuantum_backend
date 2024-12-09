import express from "express";
import {getUsers,getUserById,createUser} from "../controllers/User.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyAdmin, getUsers);
// router.get("/users/:id", verifyAdmin, getUserById);
router.post("/users", createUser);

export default router;