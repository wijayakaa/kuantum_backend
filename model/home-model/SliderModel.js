import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import User from "../UserModel.js";

const { DataTypes } = Sequelize;

const Slider = db.define("slider", {
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
        type: DataTypes.STRING,
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
    }
}, {
    freezeTableName: true
});

User.hasMany(Slider);
Slider.belongsTo(User, { foreignKey: "userId" });

export default Slider;