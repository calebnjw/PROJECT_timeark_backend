// importing useful packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// import passport from "./config/passport/passport";

// starting mongo
import "./models";

// import Mongo Models
import UserModel from "./models/users";
import ClientModel from "./models/client";
import ProjectModel from "./models/project";
import TaskModel from "./models/task";

// import controllers
import UsersController from "./controllers/usersController";
import ClientController from "./controllers/clientController";
import ProjectsController from "./controllers/projectsController";
import TasksController from "./controllers/tasksController";

// initializing Controllers
const userController = new UsersController(UserModel);
const clientController = new ClientController(ClientModel);
const ProjectController = new ProjectsController(ProjectModel);
const TaskController = new TasksController(TaskModel);

// import routers
import UsersRouter from "./routers/usersRouter";
import ClientRouter from "./routers/clientRouter";
import ProjectsRouter from "./routers/projectsRouter";
import TasksRouter from "./routers/tasksRouter";

// initialize routers
// const usersRouter = new UsersRouter(userController, passport).routes();
const clientRouter = new ClientRouter(clientController).routes();
const projectsRouter = new ProjectsRouter(ProjectController).routes();
const tasksRouter = new TasksRouter(TaskController).routes();

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

// app.use("/users", usersRouter);
app.use("/clients", clientRouter);
app.use("/projects", projectsRouter);
app.use("/tasks", tasksRouter);

const PORT: number | string = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
