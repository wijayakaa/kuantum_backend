import Solution from "../model/SolutionModel.js";

export const getSolution = async (req, res) => {
    try {
        const response = await Solution.findAll({    
            attributes: ["title", "desc"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSolution = async (req, res) => {
    const { title, desc } = req.body;
    try {
        await Solution.create({
            title: title,
            desc: desc,
            userId: req.userId
        });
        res.status(201).json({ message: "Solution option Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSolution = async (req, res) => {
    try {
        const solution = await Solution.findOne({
            where: { uuid: req.params.id }
        });

        if (!solution) return res.status(404).json({ message: "Solution option not found" });
        const { title, desc } = req.body;

        await Solution.update({ title, desc }, {
            where: { id: solution.id }
        });
        
        res.status(200).json({ message: "Solution option updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSolution = async (req, res) => {
    try {
        const solution = await Solution.findOne({
            where: { uuid: req.params.id }
        });

        if (!solution) return res.status(404).json({ message: "Solution option not found" });

        await Solution.destroy({
            where: { id: solution.id }
        });
        
        res.status(200).json({ message: "Solution option deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};