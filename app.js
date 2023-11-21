import express from 'express';
import Hello from "./hello.js";
import Lab5 from './lab5.js';
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import AssignmentRoutes from './assignments/routes.js';
import "dotenv/config";


const app = express()
app.use(cors());
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app)
Hello(app)
Lab5(app);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
