import Career from "../model/CareerModel.js";
import fs from 'fs-extra';
import path from 'path';

export const getCareer = async (req, res) => {
    try {
        const career = await Career.findAll({
            attributes: ['uuid', 'name', 'posted_at', 'message', "city", "type", "work_at", "list_messages", "icon"]
        });
        res.status(200).json(career);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching career",
            error: error.message
        });
    }
};

export const createCareer = async (req, res) => {
    try {
        const { name,posted_at, message, city, type, work_at , list_messages,icon} = req.body;
        const career = await Career.create({
            name,
            posted_at,
            message,
            city,
            type,
            work_at,
            list_messages,
            icon,
            userId: req.userId
        });

        res.status(201).json({
            message: "Career created successfully",
            career: {
                uuid: career.uuid,
                name: career.name,
                posted_at: career.posted_at, 
                message: career.message,
                city: career.city,
                type: career.type,
                work_at: career.work_at,
                list_messages: career.list_messages,
                icon: career.icon,
            }
        });
    } catch (error) {
        
        res.status(500).json({
            message: "Error creating career",
            error: error.message
        });
    }
};

export const updateCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, message, city, type, work_at , list_messages,icon } = req.body;

        const career = await Career.findOne({ where: { uuid: id } });
        if (!career) {
            return res.status(404).json({ message: "Career not found" });
        }

        await career.update({
            name: name || career.name,
            message: message || career.message,
            city: city || career.city,
            type: type || career.type,
            work_at: work_at || career.work_at,
            list_messages: list_messages || career.list_messages,
            icon: icon || career.icon,
        });

        res.status(200).json({
            message: "Career updated successfully",
            career: {
                id: career.uuid,
                name: career.name,
                message: career.message,
                city: career.city,
                type: career.type,
                work_at: career.work_at,
                list_messages: career.list_messages,
                icon: career.icon,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating career",
            error: error.message
        });
    }
};

export const deleteCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const career = await Career.findOne({ where: { uuid: id } });
        if (!career) {
            return res.status(404).json({ message: "Career not found" });
        }

        await career.destroy();

        res.status(200).json({ message: "Career deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting career",
            error: error.message
        });
    }
};