import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Footer = db.define("footer-information", {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    contact: {
        type: DataTypes.JSON, 
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    social_media: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    freezeTableName: true
});

User.hasMany(Footer);
Footer.belongsTo(User, { foreignKey: "userId" });

export default Footer;