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
        type: DataTypes.TEXT, 
        allowNull: false,
        validate: {
            notEmpty: true,
            isValidListMessages(value) {
                try {
                    const parsed = JSON.parse(value);
                    if (!Array.isArray(parsed)) {
                        throw new Error('list_messages harus berupa array');
                    }
                    if (parsed.length < 1 || parsed.length > 10) {
                        throw new Error('list_messages harus memiliki 1-10 item');
                    }
                    parsed.forEach(item => {
                        if (typeof item !== 'string' || item.trim().length === 0) {
                            throw new Error('Setiap item dalam list_messages harus berupa string dan tidak boleh kosong');
                        }
                    });
                } catch (e) {
                    throw new Error('Invalid JSON format for list_messages');
                }
            }
        },
        get() {
            const rawValue = this.getDataValue('list_messages');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('list_messages', JSON.stringify(value));
        }
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