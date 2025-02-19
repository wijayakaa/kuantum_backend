import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import sessionSequelize from "connect-session-sequelize";
const SequelizeStore = sessionSequelize(session.Store); 
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
import ExperienceDescRoute from "./routes/ExperienceDescRoute.js";
import CareerDescRoute from "./routes/CareerDescRoute.js";
import FooterRoute from "./routes/FooterRoute.js";


dotenv.config();

const app = express();
// const store = new SequelizeStore({
//     db: db, 
//   })

// const SequelizeStore = sessionSequelize(session.Store);
const sessionStore = new SequelizeStore({
    db: db,
    tableName: 'sessions',
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000 
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    name: 'sessionId',
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000
    }    
}));

app.use(cors({
    credentials: true,
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['set-cookie']
  }));

app.use(express.json());

app.use((req, res, next) => {
    console.log('Request Headers:', req.headers);
    console.log('Session Data:', req.session);
    console.log(`${req.method} ${req.url}`);
    next();
});

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
app.use(ExperienceDescRoute);
app.use(CareerDescRoute);
app.use(FooterRoute);

// export const syncDatabase = async () => {
//     try {

//         await db.sync({ 
//             alter: true 
//         });
//         console.log('Database synchronized successfully');
//     } catch (error) {
//         console.error('Unable to sync database:', error);
//     }
// };
// store.sync();
// syncDatabase();

const PORT = process.env.PORT || process.env.app_port || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});