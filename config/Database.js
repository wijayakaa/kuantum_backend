import {Sequelize} from "sequelize";

const db = new Sequelize('backend_kuantum', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;