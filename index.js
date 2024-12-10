import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import ChooseRoute from "./routes/ChooseRoute.js";
import AuthRoute from "./routes/AuthRoute.js"; 
import SolutionRoute from "./routes/SolutionRoute.js";

dotenv.config();    

const app = express();

const sessionStore = new SequelizeStore(session.Store);

const store = new sessionStore({
    db: db,
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: 'auto' }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(ChooseRoute);
app.use(SolutionRoute);

// store.sync();    

app.listen(process.env.app_port, () => {
    console.log(`Server is running on port ${process.env.app_port}`);
});

