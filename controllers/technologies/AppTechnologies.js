import Technologies from "../../model/technologies/AppTechnologiesModel.js";
import fs from 'fs-extra';
import path from 'path';

export const createTechnologies = async (req, res) => {
    try {
        const { title } = req.body;
        const logoPath = req.file
            ? `/uploads/app-technologies/${req.file.filename}`
            : null;

        const technologies = await Technologies.create({
            title,
            logo: logoPath,
            userId: req.userId
        });

        res.status(201).json({
            message: "Technologies option created successfully",
            technologies: {
                uuid: technologies.uuid,
                title: technologies.title,
                logo: technologies.logo
            }
        });
    } catch (error) {
        if (req.file) {
            const filePath = path.join(process.cwd(), 'public', req.file.filename);
            fs.removeSync(filePath);
        }

        res.status(500).json({
            message: "Error creating technologies option",
            error: error.message
        });
    }
};

export const updateTechnologies = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const technologies = await Technologies.findOne({ where: { uuid: id } });
        if (!technologies) {
            return res.status(404).json({ message: "Technologies option not found" });
        }

        let logoPath = technologies.logo;
        if (req.file) {
            if (technologies.logo) {
                const oldLogoPath = path.join(process.cwd(), 'public', technologies.logo);
                fs.removeSync(oldLogoPath);technologies
            }

            logoPath = `/uploads/app-technologies/${req.file.filename}`;
        }

        await technologies.update({
            title: title || technologies.title,
            logo: logoPath
        });

        res.status(200).json({
            message: "Technologies option updated successfully",
            technologies: {
                id: technologies.uuid,
                title: technologies.title,
                logo: technologies.logo
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating technologies option",
            error: error.message
        });
    }
};

export const deleteTechnologies = async (req, res) => {
    try {
        const { id } = req.params;
        const technologies = await Technologies.findOne({ where: { uuid: id } });
        if (!technologies) {
            return res.status(404).json({ message: "Technologies option not found" });
        }
        if (technologies.logo) {
            const logoPath = path.join(process.cwd(), 'public', technologies.logo);
            fs.removeSync(logoPath);
        }
        await technologies.destroy();

        res.status(200).json({ message: "Technologies option deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting technologies option",
            error: error.message
        });
    }
};

export const getTechnologies = async (req, res) => {
    try {
        const technologies = await Technologies.findAll({
            attributes: ['title', 'logo']
        });
        res.status(200).json(technologies);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching technologies option",
            error: error.message
        });
    }
};