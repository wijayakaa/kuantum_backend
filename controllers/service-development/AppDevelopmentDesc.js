import Desc from "../../model/service-development/AppDevelopmentModelDesc.js";
import fs from 'fs-extra';
import path from 'path';

export const getDesc = async (req, res) => {
    try {
        const desc = await Desc.findAll({
            attributes: ['uuid', 'title', 'desc', 'image']
        });

        const parsedDesc = desc.map(item => ({
            uuid: item.uuid,
            title: item.title,
            desc: JSON.parse(item.desc),
            image: item.image
        }));

        res.status(200).json(parsedDesc);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching description",
            error: error.message
        });
    }
};

export const createDesc = async (req, res) => {
    // try {
    //     const { title } = req.body;
    //     let desc;

    //     // Handle different formats of description data
    //     try {
    //         if (typeof req.body.desc === 'string') {
    //             // If desc is sent as a JSON string
    //             desc = JSON.parse(req.body.desc);
    //         } else if (Array.isArray(req.body.desc)) {
    //             // If desc is already an array
    //             desc = req.body.desc;
    //         } else if (req.body['desc[]']) {
    //             // If desc is sent as form-data array
    //             desc = Array.isArray(req.body['desc[]']) 
    //                 ? req.body['desc[]'] 
    //                 : [req.body['desc[]']];
    //         } else {
    //             return res.status(400).json({
    //                 message: "Description must be provided as an array"
    //             });
    //         }

    //         // Validate that desc is an array
    //         if (!Array.isArray(desc)) {
    //             throw new Error('Description must be an array');
    //         }

    //         // Validate array items
    //         if (desc.length < 1 || desc.length > 10) {
    //             throw new Error('Description must have 1-10 items');
    //         }

    //         desc.forEach(item => {
    //             if (typeof item !== 'string' || item.trim().length === 0) {
    //                 throw new Error('Each item in description must be a non-empty string');
    //             }
    //         });
    //     } catch (error) {
    //         return res.status(400).json({
    //             message: error.message
    //         });
    //     }
        
    //     if (!req.file) {
    //         return res.status(400).json({ message: "Image is required" });
    //     }

    //     const imagePath = `/uploads/app-slider-information/${req.file.filename}`;

    //     const newDesc = await Desc.create({
    //         title,
    //         desc: JSON.stringify(desc),
    //         image: imagePath,
    //         userId: req.userId
    //     });

    //     res.status(201).json({
    //         message: "Description Created Successfully",
    //         desc: {
    //             uuid: newDesc.uuid,
    //             title: newDesc.title,
    //             image: newDesc.image,
    //             desc: desc
    //         }
    //     });
    // } catch (error) {
    //     if (req.file) {
    //         const filePath = path.join(process.cwd(), 'public', req.file.filename);
    //         await fs.remove(filePath);
    //     }

    //     res.status(500).json({
    //         message: "Error creating description",
    //         error: error.message
    //     });
    // }
};

export const updateDesc = async (req, res) => {
    try {
        const description = await Desc.findOne({
            where: { uuid: req.params.id }
        });

        if (!description) {
            return res.status(404).json({ message: "Description not found" });
        }

        const { title } = req.body;
        let desc;

        // Handle different formats of description data
        try {
            if (typeof req.body.desc === 'string') {
                desc = JSON.parse(req.body.desc);
            } else if (Array.isArray(req.body.desc)) {
                desc = req.body.desc;
            } else if (req.body['desc[]']) {
                desc = Array.isArray(req.body['desc[]']) 
                    ? req.body['desc[]'] 
                    : [req.body['desc[]']];
            } else {
                desc = JSON.parse(description.desc); // Keep existing description if not provided
            }

            if (desc && (!Array.isArray(desc) || desc.some(item => typeof item !== 'string' || item.trim().length === 0))) {
                throw new Error('Invalid description format');
            }
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }

        let imagePath = description.image;

        if (req.file) {
            if (description.image) {
                const oldImagePath = path.join(process.cwd(), 'public', description.image);
                await fs.remove(oldImagePath);
            }
            imagePath = `/uploads/app-slider-information/${req.file.filename}`;
        }

        await Desc.update(
            {
                title: title || description.title,
                desc: JSON.stringify(desc),
                image: imagePath
            },
            { where: { uuid: req.params.id } }
        );

        res.status(200).json({
            message: "Description updated successfully",
            desc: {
                uuid: description.uuid,
                title: title || description.title,
                image: imagePath,
                desc: desc
            }
        });
    } catch (error) {
        if (req.file) {
            const filePath = path.join(process.cwd(), 'public', req.file.filename);
            await fs.remove(filePath);
        }
        res.status(500).json({ message: error.message });
    }
};

export const deleteDesc = async (req, res) => {
    // try {
    //     const description = await Desc.findOne({
    //         where: { uuid: req.params.id }
    //     });

    //     if (!description) {
    //         return res.status(404).json({ message: "Description not found" });
    //     }

    //     if (description.image) {
    //         const imagePath = path.join(process.cwd(), 'public', description.image);
    //         await fs.remove(imagePath);
    //     }

    //     await Desc.destroy({
    //         where: { uuid: req.params.id }
    //     });

    //     res.status(200).json({ message: "Description deleted successfully" });
    // } catch (error) {
    //     res.status(500).json({
    //         message: "Error deleting description",
    //         error: error.message
    //     });
    // }
};