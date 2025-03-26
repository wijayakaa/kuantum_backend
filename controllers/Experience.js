import Experience from "../model/ExperienceModel.js";
import fs from 'fs-extra';
import path from 'path';

export const getExperience = async (req, res) => {
    try {
        const experience = await Experience.findAll({
            attributes: ['uuid','title', 'desc', 'image']
        });
        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching experience",
            error: error.message
        });
    }
};

export const createExperience = async (req, res) => {
    try {
        const { title, desc } = req.body;

        // Validasi panjang deskripsi
        if (desc.length > 500) {
            return res.status(400).json({
                message: "Deskripsi tidak boleh lebih dari 500 karakter"
            });
        }

        const imagePath = req.file
            ? `/uploads/experience/${req.file.filename}`
            : null;

        const experience = await Experience.create({
            title,
            desc,
            image: imagePath,
            userId: req.userId
        });

        res.status(201).json({
            message: "Experience created successfully",
            experience: {
                image: experience.image,
                uuid: experience.uuid,
                title: experience.title,
                desc: experience.desc,
            }
        });
    } catch (error) {
        if (req.file) {
            const filePath = path.join(process.cwd(), 'public', req.file.filename);
            fs.removeSync(filePath);
        }

        res.status(500).json({
            message: "Error creating experience",
            error: error.message
        });
    }
};

export const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc } = req.body;

        // Validasi panjang deskripsi
        if (desc && desc.length > 500) {
            return res.status(400).json({
                message: "Deskripsi tidak boleh lebih dari 500 karakter"
            });
        }

        const experience = await Experience.findOne({ where: { uuid: id } });
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        let imagePath = experience.image;
        if (req.file) {
            if (experience.image) {
                const oldImagePath = path.join(process.cwd(), 'public', experience.image);
                fs.removeSync(oldImagePath);
            }

            imagePath = `/uploads/experience/${req.file.filename}`;
        }

        await experience.update({
            title: title || experience.title,
            desc: desc || experience.desc,
            image: imagePath
        });

        res.status(200).json({
            message: "Experience updated successfully",
            experience: {
                image: experience.image,
                id: experience.uuid,
                title: experience.title,
                desc: experience.desc,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating experience",
            error: error.message
        });
    }
};

export const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const experience = await Experience.findOne({ where: { uuid: id } });
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }
        if (experience.image) {
            const imagePath = path.join(process.cwd(), 'public', experience.image);
            fs.removeSync(imagePath);
        }
        await experience.destroy();

        res.status(200).json({ message: "Experience deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting experience",
            error: error.message
        });
    }
};