import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Service = db.define("service",{
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
            len: [3, 100],
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
    url : {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        },
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

User.hasMany(Service);
Service.belongsTo(User, {foreignKey: "userId"});

export default Service;