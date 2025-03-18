import Footer from "../model/FooterModel.js";

export const getFooter = async (req, res) => {
    try {
        const response = await Footer.findAll({
            attributes: ["uuid", "location", "phone", "email", "facebook", "instagram", "linkedin"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createFooter = async (req, res) => {
    // const { 
    //     location, 
    //     phone, 
    //     email, 
    //     facebook, 
    //     instagram, 
    //     linkedin 
    // } = req.body;

    // try {
    //     // Validate required fields are not empty
    //     if (!location || !phone || !email || !facebook || !instagram || !linkedin) {
    //         return res.status(400).json({
    //             message: "All fields (location, phone, email, facebook, instagram, linkedin) are required"
    //         });
    //     }

    //     await Footer.create({
    //         location,
    //         phone,
    //         email,
    //         facebook,
    //         instagram,
    //         linkedin,
    //         userId: req.userId
    //     });

    //     res.status(201).json({ message: "Footer created successfully" });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
};

export const updateFooter = async (req, res) => {
    try {
        const footer = await Footer.findOne({
            where: { uuid: req.params.id }
        });

        if (!footer) {
            return res.status(404).json({ message: "Footer not found" });
        }

        const { 
            location, 
            phone, 
            email, 
            facebook, 
            instagram, 
            linkedin 
        } = req.body;

        // Validate required fields are not empty
        if (!location || !phone || !email || !facebook || !instagram || !linkedin) {
            return res.status(400).json({
                message: "All fields (location, phone, email, facebook, instagram, linkedin) are required"
            });
        }

        await Footer.update({
            location,
            phone,
            email,
            facebook,
            instagram,
            linkedin
        }, {
            where: { id: footer.id }
        });

        res.status(200).json({ message: "Footer updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFooter = async (req, res) => {
    // try {
    //     const footer = await Footer.findOne({
    //         where: { uuid: req.params.id }
    //     });

    //     if (!footer) {
    //         return res.status(404).json({ message: "Footer not found" });
    //     }

    //     await Footer.destroy({
    //         where: { id: footer.id }
    //     });

    //     res.status(200).json({ message: "Footer deleted successfully" });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
};