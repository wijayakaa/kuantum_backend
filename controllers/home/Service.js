import Service from "../../model/home-model/ServiceModel.js";

export const getService = async (req, res) => {
    try {
        const response = await Service.findAll({
            attributes: ["uuid", "title", "desc", "icon"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createService = async (req, res) => {
    const { title, desc, icon } = req.body;
    try {
        await Service.create({
            icon: icon,
            title: title,
            desc: desc,
            userId: req.userId
        });
        res.status(201).json({ message: "Service option Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const service = await Service.findOne({
            where: { uuid: req.params.id }
        });

        if (!service) return res.status(404).json({ message: "Service option not found" });
        const { title, desc, icon, } = req.body;

        await Service.update({ title, desc, icon, }, {
            where: { id: service.id }
        });

        res.status(200).json({ message: "Service option updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const service = await Service.findOne({
            where: { uuid: req.params.id }
        });

        if (!service) return res.status(404).json({ message: "Service option not found" });

        await Service.destroy({
            where: { id: service.id }
        });

        res.status(200).json({ message: "Service option deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};