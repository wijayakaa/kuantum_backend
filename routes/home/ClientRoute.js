import express from "express";
import { createClient, updateClient, deleteClient, getClients } from "../../controllers/home/Client.js";
import { uploadClient, validateFileType } from "../../middleware/uploadFile.js";
import { verifyAdmin } from "../../middleware/AuthUser.js";

const router = express.Router();

router.get("/clients", getClients);
router.post("/clients", verifyAdmin, uploadClient.single("logo"), validateFileType, createClient);
router.patch("/clients/:id", verifyAdmin, uploadClient.single("logo"), validateFileType, updateClient);
router.delete("/clients/:id", verifyAdmin, deleteClient);

export default router;