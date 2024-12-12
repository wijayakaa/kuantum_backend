import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import User from "../UserModel.js";

const { DataTypes } = Sequelize;

const Technologies = db.define("app-technologies", {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
}, {
    freezeTableName: true
});

User.hasMany(Technologies);
Technologies.belongsTo(User, { foreignKey: "userId" });

export default Technologies;