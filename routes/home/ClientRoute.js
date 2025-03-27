import express from "express";
import { createClient, updateClient, deleteClient, getClients } from "../../controllers/home/Client.js";
import { uploadClient, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/clients", getClients);
router.post("/api/clients", verifyAdmin, uploadClient.single("logo"), validateFileType, createClient);
router.put("/api/clients/:id", verifyAdmin, uploadClient.single("logo"), updateClient);
router.delete("/api/clients/:id", verifyAdmin, deleteClient);

export default router;