import "dotenv/config";
import express from 'express';
import Hello from "./hello.js";
import Lab5 from './lab5.js';
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import cors from "cors";
import AssignmentRoutes from './assignments/routes.js';
import "dotenv/config";

import mongoose from "mongoose";



import session from "express-session";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);


const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));



app.use(express.json());


ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app)
Hello(app)
Lab5(app);
UserRoutes(app);


//app.listen(4000);



const PORT =  process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
