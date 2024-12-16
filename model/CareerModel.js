import { Sequelize } from "sequelize";
import db from "./../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Career = db.define("career", {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255],
        },
    },
    posted_at: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    work_at: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    list_messages: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
            notEmpty: true,
            isValidListMessages(value) {
                if (!Array.isArray(value)) {
                    throw new Error('list_messages harus berupa array');
                }
                if (value.length < 1 || value.length > 10) {
                    throw new Error('list_messages harus memiliki 1-10 item');
                }
                value.forEach(item => {
                    if (typeof item !== 'string' || item.trim().length === 0) {
                        throw new Error('Setiap item dalam list_messages harus berupa string dan tidak boleh kosong');
                    }
                });
            }
        },
        defaultValue: [],
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    freezeTableName: true
});

User.hasMany(Career);
Career.belongsTo(User, { foreignKey: "userId" });

export default Career;