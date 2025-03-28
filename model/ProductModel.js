import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Product = db.define("product",{
    uuid : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true,
        },
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        },
    },
    price : {
        type: DataTypes.INTEGER,
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

User.hasMany(Product);
Product.belongsTo(User, {foreignKey: "userId"});

export default Product;