import Process from "../../model/process/WebProcessModel.js";

export const getProcess = async (req, res) => {
    try {
        const response = await Process.findAll({
            attributes: ['uuid',"title", "desc", "icon"],
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
        res.status(201).json({ message: "Web Process option Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProcess = async (req, res) => {
    try {
        const process = await Process.findOne({
            where: { uuid: req.params.id }
        });

        if (!process) return res.status(404).json({ message: "Web Process option not found" });
        const { title, desc, icon } = req.body;

        await Process.update({ title, desc, icon }, {
            where: { id: process.id }
        });

        res.status(200).json({ message: "Web Process option updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProcess = async (req, res) => {
    try {
        const process = await Process.findOne({
            where: { uuid: req.params.id }
        });

        if (!process) return res.status(404).json({ message: "Web Process option not found" });

        await Process.destroy({
            where: { id: process.id }
        });

        res.status(200).json({ message: "Web Process option deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};