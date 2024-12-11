import Solution from "../../model/home-model/SolutionModel.js";

export const getSolution = async (req, res) => {
    try {
        const response = await Solution.findAll({    
            attributes: ["icon","title", "desc"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSolution = async (req, res) => {
    const { title, desc,icon } = req.body;
    try {
        await Solution.create({
            icon: icon, 
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
        const { title, desc, icon } = req.body;

        await Solution.update({ title, desc,icon }, {
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