import Choose from "../model/ChooseModel.js";

export const getChoosen = async (req, res) => {
    try {
        const response = await Choose.findAll({    
            attributes: ["title", "desc"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createChoosen = async (req, res) => {
    const { title, desc } = req.body;
    try {
        await Choose.create({
            title: title,
            desc: desc,
            userId: req.userId
        });
        res.status(201).json({ message: "Choosen option Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateChoosen = async (req, res) => {
    try {
        const choosen = await Choose.findOne({
            where: { uuid: req.params.id }
        });

        if (!choosen) return res.status(404).json({ message: "Choosen option not found" });
        const { title, desc } = req.body;

        await Choose.update({ title, desc }, {
            where: { id: choosen.id }
        });
        
        res.status(200).json({ message: "Choosen option updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteChoosen = async (req, res) => {
    try {
        const choosen = await Choose.findOne({
            where: { uuid: req.params.id }
        });

        if (!choosen) return res.status(404).json({ message: "Choosen option not found" });

        await Choose.destroy({
            where: { id: choosen.id }
        });
        
        res.status(200).json({ message: "Choosen option deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};