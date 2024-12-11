import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import User from "../UserModel.js";

const { DataTypes } = Sequelize;

const Choose = db.define("choose",{
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
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty: true,
        },
    },
},{
    freezeTableName: true
});

User.hasMany(Choose);
Choose.belongsTo(User, {foreignKey: "userId"});

export default Choose;