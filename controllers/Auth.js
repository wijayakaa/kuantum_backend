import User from "../model/UserModel.js";
import argon2 from "argon2";
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) return res.status(404).json({ message: "You have entered an invalid credential" });
        if (user.role !== "admin") return res.status(403).json({ message: "Access denied. Admin only." });

        const match = await argon2.verify(user.password, req.body.password);
        if (!match) return res.status(400).json({ message: "You have entered an invalid credential" });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.uuid, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const Logout = async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
};

export const ResetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirmation do not match" });
        }

        const user = await User.findOne({
            where: { email: email },
        });

        if (!user) return res.status(404).json({ message: "invalid username" });

        const hashPassword = await argon2.hash(newPassword);
        await User.update(
            { password: hashPassword },
            { where: { email: email } }
        );

        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}