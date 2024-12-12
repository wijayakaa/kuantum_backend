import { fileTypeFromFile } from "file-type";
import { access, unlink } from "node:fs/promises";
import { TYPE_IMAGE } from "./uploadFile.js";

async function checkFile(path) {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

export default async function checkFileType(req, res, next) {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const fileType = await fileTypeFromFile(req.file.path);
        const acceptMime = Object.keys(TYPE_IMAGE);

        if (!acceptMime.includes(fileType.mime)) {
            const isExistFile = await checkFile(req.file.path);
            if (isExistFile) {
                await unlink(req.file.path);
            }
            return res.status(400).json({ message: "File is not a valid image" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Error checking file type", error: error.message });
    }
}