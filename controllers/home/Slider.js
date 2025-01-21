import Slider from "../../model/home-model/SliderModel.js";
import fs from 'fs-extra';
import path from 'path';

export const getSlider = async (req, res) => {
    try {
        const slider = await Slider.findAll({
            attributes: ['uuid', 'title', 'image', 'desc']
        });
        res.status(200).json(slider);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching slider",
            error: error.message
        });
    }
};

export const createSlider = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const imagePath = req.file
            ? `/uploads/slider/${req.file.filename}`
            : null;

        const slider = await Slider.create({
            title,
            desc,
            image: imagePath,
            userId: req.userId
        });

        res.status(201).json({
            message: "Slider created successfully",
            slider: {
                uuid: slider.uuid,
                title: slider.title,
                desc: slider.desc,
                image: slider.image
            }
        });
    } catch (error) {
        if (req.file) {
            const filePath = path.join(process.cwd(), 'public', req.file.filename);
            fs.removeSync(filePath);
        }

        res.status(500).json({
            message: "Error creating slider",
            error: error.message
        });
    }
};

export const updateSlider = async (req, res) => {
    try {
        const { id } = req.params;
        const { title,desc } = req.body;

        const slider = await Slider.findOne({ where: { uuid: id } });
        if (!slider) {
            return res.status(404).json({ message: "Slider not found" });
        }

        let imagePath = slider.image;
        if (req.file) {
            if (slider.image) {
                const oldImagePath = path.join(process.cwd(), 'public', slider.image);
                fs.removeSync(oldImagePath);
            }

            imagePath = `/uploads/slider/${req.file.filename}`;
        }

        await slider.update({
            title: title || slider.title,
            desc: desc || slider.desc,
            image: imagePath
        });

        res.status(200).json({
            message: "Slider updated successfully",
            slider: {
                id: slider.uuid,
                title: slider.title,
                desc: slider.desc,
                image: slider.image
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating slider",
            error: error.message
        });
    }
};

export const deleteSlider = async (req, res) => {
    try {
        const { id } = req.params;
        const slider = await Slider.findOne({ where: { uuid: id } });
        if (!slider) {
            return res.status(404).json({ message: "Slider not found" });
        }
        if (slider.image) {
            const imagePath = path.join(process.cwd(), 'public', slider.image);
            fs.removeSync(imagePath);
        }
        await slider.destroy();

        res.status(200).json({ message: "Slider deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting slider",
            error: error.message
        });
    }
};
