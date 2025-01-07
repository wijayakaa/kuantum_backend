import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import User from "./../UserModel.js";

const { DataTypes } = Sequelize;

const Desc = db.define("career-desc", {
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
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            isValidDesc(value) {
                try {
                    const parsed = JSON.parse(value);
                    if (!Array.isArray(parsed)) {
                        throw new Error('Description must be an array');
                    }
                    if (parsed.length < 1 || parsed.length > 10) {
                        throw new Error('Description must have 1-10 items');
                    }
                    parsed.forEach(item => {
                        if (typeof item !== 'string' || item.trim().length === 0) {
                            throw new Error('Each item in description must be a non-empty string');
                        }
                    });
                } catch (e) {
                    throw new Error('Invalid JSON format for description');
                }
            }
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    freezeTableName: true
});

User.hasMany(Desc);
Desc.belongsTo(User, { foreignKey: "userId" });

export default Desc;