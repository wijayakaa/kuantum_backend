import Desc from "../model/ExperienceDescModel.js";

export const getDesc = async (req, res) => {
    try {
        const desc = await Desc.findAll({
            attributes: ['uuid', 'desc']
        });
        
        const parsedDesc = desc.map(item => ({
            uuid: item.uuid,
            desc: JSON.parse(item.desc)
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
    try {
        const { desc } = req.body;
        
        if (!Array.isArray(desc)) {
            return res.status(400).json({ 
                message: "Description must be an array" 
            });
        }

        const newDesc = await Desc.create({
            desc: JSON.stringify(desc),
            userId: req.userId
        });

        res.status(201).json({ 
            message: "Description Created Successfully",
            desc: {
                uuid: newDesc.uuid,
                desc: desc
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDesc = async (req, res) => {
    try {
        const choosen = await Desc.findOne({
            where: { uuid: req.params.id }
        });
        
        if (!choosen) {
            return res.status(404).json({ message: "Description not found" });
        }

        const { desc } = req.body;

        if (!Array.isArray(desc)) {
            return res.status(400).json({ 
                message: "Description must be an array" 
            });
        }

        await Desc.update(
            { desc: JSON.stringify(desc) }, 
            { where: { id: choosen.id } }
        );
        
        res.status(200).json({ 
            message: "Description updated successfully",
            desc: {
                uuid: choosen.uuid,
                desc: desc
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};