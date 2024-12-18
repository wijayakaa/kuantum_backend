import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js"; 
import ChooseRoute from "./routes/home/ChooseRoute.js";
import SolutionRoute from "./routes/home/SolutionRoute.js";
import ServiceRoute from "./routes/home/ServiceRoute.js";
import WebProcessRoute from "./routes/process/WebProcessRoute.js";
import AppProcessRoute from "./routes/process/AppProcessRoute.js";
import SiProcessRoute from "./routes/process/SiProcessRoute.js";
import ClientRoute from "./routes/home/ClientRoute.js";
import SliderRoute from "./routes/home/SliderRoute.js";
import AppTechnologiesRoute from "./routes/technologies/AppTechnologiesRoute.js";
import SiTechnologiesRoute from "./routes/technologies/SiTechnologiesRoute.js";
import WebTechnologiesRoute from "./routes/technologies/WebTechnologiesRoute.js";
import ExperienceRoute from "./routes/ExperienceRoute.js";
import CareerRoute from "./routes/CareerRoute.js";
import AppDevelopmentModelDescRoute from "./routes/service-development/AppDevelopmentModelDescRoute.js";
import SiDevelopmentModelDescRoute from "./routes/service-development/SiDevelopmentModelDescRoute.js";
import WebAppDevelopmentModelDescRoute from "./routes/service-development/WebDevelopmentModelDescRoute.js";


dotenv.config();    

const app = express();

const sessionStore = new SequelizeStore(session.Store);

const store = new sessionStore({
    db: db,
});

    (async()=>{
        await db.sync();
    })();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: 'auto' }
}));

// app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:3000'
// }));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3001'
}));

app.use(express.json());
app.use('/uploads', express.static('public/uploads'));
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(ChooseRoute);   
app.use(SolutionRoute);
app.use(ServiceRoute);
app.use(WebProcessRoute);
app.use(AppProcessRoute);
app.use(SiProcessRoute);
app.use(ClientRoute);
app.use(ClientRoute);
app.use(SliderRoute);
app.use(AppTechnologiesRoute);
app.use(SiTechnologiesRoute);
app.use(WebTechnologiesRoute);
app.use(ExperienceRoute);
app.use(CareerRoute);
app.use(AppDevelopmentModelDescRoute);
app.use(SiDevelopmentModelDescRoute);   
app.use(WebAppDevelopmentModelDescRoute);

store.sync();

app.listen(process.env.app_port, () => {
    console.log(`Server is running on port ${process.env.app_port}`);
});