import { Sequelize } from "sequelize";

const db = new Sequelize('db_auth','root','',{
    hott : "localhost",
    dialect : "mysql"
});

export default db;