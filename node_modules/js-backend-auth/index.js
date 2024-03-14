import express from "express";
import db from "./config/Database.js";
import env from "dotenv";
import router from "./root/index.js";
env.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected . . .');
    await db.sync();
} catch (error) {
    console.error(error);
}

app.use(express.json());
app.use(router);

app.listen(8000, ()=> console.log('runing at port 8000'));