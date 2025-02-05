import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js';

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            where: {
                uuid: decoded.userId
            }
        });

        if (!user) return res.status(404).json({ message: "User not found" });
        
        req.userId = user.id;
        req.role = user.role;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const verifyAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            where: {
                uuid: decoded.userId
            }
        });

        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.role !== "admin") return res.status(403).json({ message: "Access denied. Admin only." });
        
        req.userId = user.id;
        req.role = user.role;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}