import Client from "../../model/home-model/ClientModel.js";
import fs from 'fs-extra';
import path from 'path';

export const createClient = async (req, res) => {
    try {
        const { title } = req.body;
        const logoPath = req.file
            ? `/uploads/client/${req.file.filename}`
            : null;

        const client = await Client.create({
            title,
            logo: logoPath,
            userId: req.userId
        });

        res.status(201).json({
            message: "Client created successfully",
            client: {
                uuid: client.uuid,
                title: client.title,
                logo: client.logo
            }
        });
    } catch (error) {
        if (req.file) {
            const filePath = path.join(process.cwd(), 'public', req.file.filename);
            fs.removeSync(filePath);
        }

        res.status(500).json({
            message: "Error creating client",
            error: error.message
        });
    }
};

export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const client = await Client.findOne({ where: { uuid: id } });
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        let logoPath = client.logo;
        if (req.file) {
            if (client.logo) {
                const oldLogoPath = path.join(process.cwd(), 'public', client.logo);
                fs.removeSync(oldLogoPath);
            }

            logoPath = `/uploads/client/${req.file.filename}`;
        }

        await client.update({
            title: title || client.title,
            logo: logoPath
        });

        res.status(200).json({
            message: "Client updated successfully",
            client: {
                id: client.uuid,
                title: client.title,
                logo: client.logo
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating client",
            error: error.message
        });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findOne({ where: { uuid: id } });
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        if (client.logo) {
            const logoPath = path.join(process.cwd(), 'public', client.logo);
            fs.removeSync(logoPath);
        }
        await client.destroy();

        res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting client",
            error: error.message
        });
    }
};

export const getClients = async (req, res) => {
    try {
        const clients = await Client.findAll({
            attributes: ['title', 'logo']
        });
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching clients",
            error: error.message
        });
    }
};