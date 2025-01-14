import Footer from "../model/FooterModel.js";

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
        // Memastikan contact dan social_media adalah array
        const contactArray = Array.isArray(contact) ? contact : [contact];
        const socialMediaArray = Array.isArray(social_media) ? social_media : [social_media];

        // Memvalidasi struktur data contact
        const validateContact = (data) => {
            return data.every(item => {
                return typeof item === 'object' && 
                       item.hasOwnProperty('number') && 
                       item.hasOwnProperty('icon');
            });
        };

        // Memvalidasi struktur data social media
        const validateSocialMedia = (data) => {
            return data.every(item => {
                return typeof item === 'object' && 
                       item.hasOwnProperty('instagram') && 
                       item.hasOwnProperty('icon');
            });
        };

        if (!validateContact(contactArray)) {
            return res.status(400).json({ 
                message: "Invalid data structure for contact. Each contact must have 'number' and 'icon' properties" 
            });
        }

        if (!validateSocialMedia(socialMediaArray)) {
            return res.status(400).json({ 
                message: "Invalid data structure for social_media. Each social media must have 'instagram' and 'icon' properties" 
            });
        }

        await Footer.create({
            location,
            contact: contactArray,
            social_media: socialMediaArray,
            userId: req.userId
        });

        res.status(201).json({ message: "Footer option Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFooter = async (req, res) => {
    try {
        const footer = await Footer.findOne({
            where: { uuid: req.params.id }
        });

        if (!footer) return res.status(404).json({ message: "Footer option not found" });
        
        const { location, contact, social_media } = req.body;
        
        // Memastikan contact dan social_media adalah array
        const contactArray = Array.isArray(contact) ? contact : [contact];
        const socialMediaArray = Array.isArray(social_media) ? social_media : [social_media];

        // Memvalidasi struktur data contact
        const validateContact = (data) => {
            return data.every(item => {
                return typeof item === 'object' && 
                       item.hasOwnProperty('number') && 
                       item.hasOwnProperty('icon');
            });
        };

        // Memvalidasi struktur data social media
        const validateSocialMedia = (data) => {
            return data.every(item => {
                return typeof item === 'object' && 
                       item.hasOwnProperty('instagram') && 
                       item.hasOwnProperty('icon');
            });
        };

        if (!validateContact(contactArray)) {
            return res.status(400).json({ 
                message: "Invalid data structure for contact. Each contact must have 'number' and 'icon' properties" 
            });
        }

        if (!validateSocialMedia(socialMediaArray)) {
            return res.status(400).json({ 
                message: "Invalid data structure for social_media. Each social media must have 'instagram' and 'icon' properties" 
            });
        }

        await Footer.update({
            location,
            contact: contactArray,
            social_media: socialMediaArray
        }, {
            where: { id: footer.id }
        });

        res.status(200).json({ message: "Footer option updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFooter = async (req, res) => {
    try {
        const footer = await Footer.findOne({
            where: { uuid: req.params.id }
        });

        if (!footer) return res.status(404).json({ message: "Footer option not found" });

        await Footer.destroy({
            where: { id: footer.id }
        });

        res.status(200).json({ message: "Footer option deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};