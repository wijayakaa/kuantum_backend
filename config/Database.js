import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "mysql",
        dialectModule: mysql2,
        pool: {
            max: 4,
            min: 0,
            acquire: 30000,
            idle: 10000,
            evict: 5000
        },
        logging: process.env.NODE_ENV !== 'production',
        retry: {
            max: 3
        },
        dialectOptions: {
            connectTimeout: 10000,
            dateStrings: true,
            typeCast: true
        }
    }
);

db.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default db;