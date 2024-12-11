import Process from "../../model/process/AppProcessModel.js";

export const getProcess = async (req, res) => {
    try {
        const response = await Process.findAll({
            attributes: ["title", "desc", "icon"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProcess = async (req, res) => {
    const { title, desc, icon } = req.body;
    try {
        await Process.create({
            icon: icon,
            title: title,
            desc: desc,
            userId: req.userId
        });
        res.status(201).json({ message: "App Process option Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProcess = async (req, res) => {
    try {
        const process = await Process.findOne({
            where: { uuid: req.params.id }
        });

        if (!process) return res.status(404).json({ message: "App Process option not found" });
        const { title, desc, icon } = req.body;

        await Process.update({ title, desc, icon }, {
            where: { id: process.id }
        });

        res.status(200).json({ message: "App Process option updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProcess = async (req, res) => {
    try {
        const process = await Process.findOne({
            where: { uuid: req.params.id }
        });

        if (!process) return res.status(404).json({ message: "App Process option not found" });

        await Process.destroy({
            where: { id: process.id }
        });

        res.status(200).json({ message: "App Process option deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};