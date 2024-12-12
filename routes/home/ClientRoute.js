import express from "express";
import { createClient, updateClient, deleteClient, getAllClients } from "../../controllers/home/Client.js";
import upload from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/clients", getAllClients);
router.post("/clients", verifyAdmin, upload.single("logo"), createClient);
router.patch("/clients/:id", verifyAdmin, upload.single("logo"), updateClient);
router.delete("/clients/:id", verifyAdmin, deleteClient);

export default router;
