import Slider from "../../model/home-model/SliderModel.js";
// import cloudinary from 'cloudinary';
import { cloudinary } from "../../config/cloudinary.js";
import fs from 'fs-extra';
import path from 'path';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

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
        const imagePath = req.file ? req.file.path : null;

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
        if (req.file?.path) {
            await cloudinary.uploader.destroy(req.file.filename);
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
        const { title, desc } = req.body;

        const slider = await Slider.findOne({ where: { uuid: id } });
        if (!slider) {
            return res.status(404).json({ message: "Slider not found" });
        }

        let imagePath = slider.image;
        if (req.file) {
            // Delete old image from Cloudinary if exists
            if (slider.image) {
                const publicId = slider.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
            imagePath = req.file.path;
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
