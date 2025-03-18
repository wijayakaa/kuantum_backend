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
            max: 4, // Kurangi nilai max menjadi 4 (lebih kecil dari batas 5)
            min: 0,
            acquire: 30000,
            idle: 10000, // Waktu idle koneksi sebelum dilepaskan
            evict: 5000  // Pemeriksaan koneksi idle setiap 5 detik
        },
        logging: process.env.NODE_ENV !== 'production', // Kurangi logging di production
        retry: {
            max: 3 // Jumlah maksimum percobaan koneksi
        },
        dialectOptions: {
            connectTimeout: 10000, // Timeout koneksi dalam ms
            // Opsi tambahan untuk koneksi yang lebih stabil
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