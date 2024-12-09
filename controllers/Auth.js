// controllers/Auth.js
import User from "../model/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if(!user) return res.status(404).json({message: "User not found"});
    if(user.role !== "admin") return res.status(403).json({message: "Access denied. Admin only."});
    
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({message: "Wrong Password"});
    req.session.userId = user.uuid;

    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
}

export const Logout = async (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({message: "Cannot logout"});
        res.status(200).json({message: "You have been logged out"});
    });
};


export const ResetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        
        if(newPassword !== confirmPassword) {
            return res.status(400).json({message: "New password and confirmation do not match"});
        }

        const user = await User.findOne({
            where: { email: email }
        });

        if(!user) return res.status(404).json({message: "User not found"});
        
        const hashPassword = await argon2.hash(newPassword);
        await User.update(
            { password: hashPassword },
            { where: { email: email } }
        );

        res.status(200).json({message: "Password has been reset successfully"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}