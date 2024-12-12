import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import crypto from 'crypto';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public/uploads/clients');
fs.mkdirSync(uploadsDir, { recursive: true });

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `client-logo-${uniqueSuffix}${ext}`);
    }
});

// File filter for images
const imageFilter = (req, file, cb) => {
    // Accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    }
});

export default upload;