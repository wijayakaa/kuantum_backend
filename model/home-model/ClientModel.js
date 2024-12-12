import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import User from "../UserModel.js";

const { DataTypes } = Sequelize;

const Client = db.define("client", {
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

User.hasMany(Client);
Client.belongsTo(User, { foreignKey: "userId" });

export default Client;