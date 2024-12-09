import User from '../model/UserModel.js';

export const verifyAdmin = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({message: "Login required"});
    }

    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });

    if(!user) return res.status(404).json({message: "User not found"});
    if(user.role !== "admin") return res.status(403).json({message: "Access denied. Admin only."});
    
    req.userId = user.id;
    req.role = user.role;
    next();
};