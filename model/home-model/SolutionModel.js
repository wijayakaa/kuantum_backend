import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import User from "../UserModel.js";

const { DataTypes } = Sequelize;

const Solution = db.define("solution",{
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true,
        },
    },
    title : {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        },
    },
    desc : {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        },
    },
    icon: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        },
    },
},{
    freezeTableName: true
});

User.hasMany(Solution);
Solution.belongsTo(User, {foreignKey: "userId"});

export default Solution;