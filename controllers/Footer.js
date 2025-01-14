import Footer from "../model/FooterModel.js";

// Validation helper functions
const validateStructure = (data) => {
    return data.every(item => {
        const hasRequiredProps = 
            typeof item === 'object' &&
            item !== null &&
            'value' in item &&
            'icon' in item &&
            'category' in item;
            
        const hasValidTypes =
            typeof item.value === 'string' &&
            typeof item.icon === 'string' &&
            typeof item.category === 'string';
            
        return hasRequiredProps && hasValidTypes;
    });
};

export const getFooter = async (req, res) => {
    try {
        const response = await Footer.findAll({
            attributes: ["uuid", "location", "contact", "social_media"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createFooter = async (req, res) => {
    const { location, contact, social_media } = req.body;
    try {
        // Ensure arrays and handle single items
        const contactArray = Array.isArray(contact) ? contact : [contact];
        const socialMediaArray = Array.isArray(social_media) ? social_media : [social_media];

        // Validate contact structure
        if (!validateStructure(contactArray)) {
            return res.status(400).json({
                message: "Invalid contact structure. Each contact must have string 'value', 'icon', and 'category' properties"
            });
        }

        // Validate social_media structure
        if (!validateStructure(socialMediaArray)) {
            return res.status(400).json({
                message: "Invalid social_media structure. Each social media must have string 'value', 'icon', and 'category' properties"
            });
        }

        await Footer.create({
            location,
            contact: contactArray,
            social_media: socialMediaArray,
            userId: req.userId
        });

        res.status(201).json({ message: "Footer created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFooter = async (req, res) => {
    try {
        const footer = await Footer.findOne({
            where: { uuid: req.params.id }
        });

        if (!footer) {
            return res.status(404).json({ message: "Footer not found" });
        }

        const { location, contact, social_media } = req.body;

        // Ensure arrays and handle single items
        const contactArray = Array.isArray(contact) ? contact : [contact];
        const socialMediaArray = Array.isArray(social_media) ? social_media : [social_media];

        // Validate contact structure
        if (!validateStructure(contactArray)) {
            return res.status(400).json({
                message: "Invalid contact structure. Each contact must have string 'value', 'icon', and 'category' properties"
            });
        }

        // Validate social_media structure
        if (!validateStructure(socialMediaArray)) {
            return res.status(400).json({
                message: "Invalid social_media structure. Each social media must have string 'value', 'icon', and 'category' properties"
            });
        }

        await Footer.update({
            location,
            contact: contactArray,
            social_media: socialMediaArray
        }, {
            where: { id: footer.id }
        });

        res.status(200).json({ message: "Footer updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFooter = async (req, res) => {
    try {
        const footer = await Footer.findOne({
            where: { uuid: req.params.id }
        });

        if (!footer) {
            return res.status(404).json({ message: "Footer not found" });
        }

        await Footer.destroy({
            where: { id: footer.id }
        });

        res.status(200).json({ message: "Footer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};