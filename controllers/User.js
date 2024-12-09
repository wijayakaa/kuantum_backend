import User from "../model/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ["uuid", "name", "email"]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { uuid: req.params.id },
            attributes: ["uuid", "name", "email"]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    // const { name, email, password, confPassword } = req.body;
    // if (password !== confPassword) return res.status(400).json({ message: "Password and confirm password do not match" });
    // const hashPassword = await argon2.hash(password);
    // try {
    //     await User.create({
    //         name: name,
    //         email: email,
    //         password: hashPassword,
    //         role: "admin"  // Force role to be admin
    //     });
    //     res.status(201).json({ message: "Admin registered successfully" });
    // } catch (error) {
    //     res.status(400).json({ message: error.message });
    // }
    res.status(201).json({ message: "Nothing happened" });
}