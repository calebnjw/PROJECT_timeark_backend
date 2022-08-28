// importing useful packages
import bcrypt from "bcrypt";
import BSON from "BSON";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressSession from "express-session";
import passport from "passport";

dotenv.config();

const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

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
import AuthRouter from "./routers/authRouter";
import UsersRouter from "./routers/usersRouter";
import ClientRouter from "./routers/clientRouter";
import ProjectsRouter from "./routers/projectsRouter";
import TasksRouter from "./routers/tasksRouter";

// initialize routers
const authRouter = new AuthRouter().routes();
const usersRouter = new UsersRouter(userController).routes();
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
    origin: FRONTEND_URL,
  })
);

app.use(
  expressSession({
    secret: GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 3600,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// starting passport
import "./config/passport";

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/clients", clientRouter);
app.use("/projects", projectsRouter);
app.use("/tasks", tasksRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
