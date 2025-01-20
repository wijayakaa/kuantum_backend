import { Sequelize } from "sequelize";
import mysql2 from 'mysql2';

const db = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    dialect: 'mysql',
    dialectModule: mysql2,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default db;