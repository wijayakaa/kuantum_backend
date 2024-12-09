// controllers/Product.js
import Product from "../model/ProductModel.js";
import User from "../model/UserModel.js";

export const getProduct = async (req, res) => {
    try {
        const response = await Product.findAll({    
            attributes: ["uuid", "name", "price"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        await Product.create({
            name: name,
            price: price,
            userId: req.userId
        });
        res.status(201).json({ message: "Product Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { uuid: req.params.id }
        });

        if (!product) return res.status(404).json({ message: "Product not found" });
        const { name, price } = req.body;

        await Product.update({ name, price }, {
            where: { id: product.id }
        });
        
        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { uuid: req.params.id }
        });

        if (!product) return res.status(404).json({ message: "Product not found" });

        await Product.destroy({
            where: { id: product.id }
        });
        
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};