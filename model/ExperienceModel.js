import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
const { DataTypes } = Sequelize;

const Experience = db.define("experience", {
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
    desc: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
        validate: {
            notEmpty: true,
            checkLength(value) {
                if (value.length > 500) {
                    throw new Error('Deskripsi tidak boleh lebih dari 500 karakter');
                }
            }
        },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
}, {
    freezeTableName: true
});

User.hasMany(Experience);
Experience.belongsTo(User, { foreignKey: "userId" });

export default Experience;