import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { fileTypeFromFile } from "file-type";

export const ALLOWED_MIME_TYPES = {
    'image/jpeg': true,
    'image/png': true,
    'image/gif': true,
    'image/webp': true
};

const baseUploadsDir = path.join(process.cwd(), 'public/uploads');

const createUploadMiddleware = (subFolder) => {
    const uploadsDir = path.join(baseUploadsDir, subFolder);
    fs.mkdirSync(uploadsDir, { recursive: true, mode: 0o755});

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadsDir);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname);
            cb(null, `${subFolder}-${uniqueSuffix}${ext}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

    return multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024 
        }
    })
};

export const uploadClient = createUploadMiddleware('client');
export const uploadSlider = createUploadMiddleware('slider');
export const uploadWebTechnologies = createUploadMiddleware('web-technologies');
export const uploadSiTechnologies = createUploadMiddleware('si-technologies');
export const uploadAppTechnologies = createUploadMiddleware('app-technologies');
export const uploadExperience = createUploadMiddleware('experience');

//information slide
export const uploadAppSliderInformation = createUploadMiddleware('app-slider-information');
export const uploadWebSliderInformation = createUploadMiddleware('web-slider-information');
export const uploadSiSliderInformation = createUploadMiddleware('si-slider-information');
export const uploadExperienceSliderInformation = createUploadMiddleware('experience-slider-information');
export const uploadCareerSliderInformation = createUploadMiddleware('career-slider-information');


export const validateFileType = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const fileType = await fileTypeFromFile(req.file.path);
        
        if (!ALLOWED_MIME_TYPES[fileType.mime]) {
            await fs.remove(req.file.path);
            return res.status(400).json({ message: "File type not allowed" });
        }

        next();
    } catch (error) {
        if (req.file) {
            await fs.remove(req.file.path);
        }
        return res.status(500).json({ 
            message: "Error validating file type",
            error: error.message 
        });
    }
};
