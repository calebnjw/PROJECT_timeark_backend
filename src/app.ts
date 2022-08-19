// importing useful packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

// starting mongo
import "./models";

// import Mongo Models
import UserModel from "./models/users";
import ProjectModel from "./models/project";
import ClientModel from "./models/client";

// import controllers
import UsersController from "./controllers/usersController";
import ProjectsController from "./controllers/projectsController";
import ClientController from "./controllers/clientController";

// initializing Controllers
const clientController = new ClientController(ClientModel);
const userController = new UsersController(UserModel);
const ProjectController = new ProjectsController(ProjectModel);

// initialize routers
import UsersRouter from "./routers/usersRouter";
import ClientRouter from "./routers/clientRouter";
import ProjectsRouter from "./routers/projectsRouter";

// import routers
const usersRouter = new UsersRouter(userController).routes();
const projectsRouter = new ProjectsRouter(ProjectController).routes();
const clientRouter = new ClientRouter(clientController).routes();

// below is where we put things together
const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use("/users", usersRouter);
app.use("/clients", clientRouter);
app.use("/projects", projectsRouter);

const PORT: number | string = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
