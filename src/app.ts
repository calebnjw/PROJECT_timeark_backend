// importing useful packages
import bcrypt from "bcrypt";
import BSON from "BSON";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressSession from "express-session";
import passport from "passport";

import isAuthenticated from "./middleware/authMiddleware";

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
import InvoiceModel from "./models/invoice";

// import controllers
import UsersController from "./controllers/usersController";
import ClientController from "./controllers/clientController";
import ProjectsController from "./controllers/projectsController";
import TasksController from "./controllers/tasksController";
import InvoicesController from "./controllers/invoicesController";

// initializing Controllers
const userController = new UsersController(UserModel);
const clientController = new ClientController(ClientModel);
const ProjectController = new ProjectsController(ProjectModel);
const TaskController = new TasksController(TaskModel);
const InvoiceController = new InvoicesController(InvoiceModel);

// import routers
import AuthRouter from "./routers/authRouter";
import UsersRouter from "./routers/usersRouter";
import ClientRouter from "./routers/clientRouter";
import ProjectsRouter from "./routers/projectsRouter";
import TasksRouter from "./routers/tasksRouter";
import InvoicesRouter from "./routers/invoicesRouter";

// initialize routers
const authRouter = new AuthRouter().routes();
const usersRouter = new UsersRouter(userController).routes();
const clientRouter = new ClientRouter(clientController).routes();
const projectsRouter = new ProjectsRouter(ProjectController).routes();
const tasksRouter = new TasksRouter(TaskController).routes();
const invoicesRouter = new InvoicesRouter(InvoiceController).routes();

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
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,
    secret: GOOGLE_CLIENT_SECRET,
    unset: "destroy",
  })
);

app.use(passport.initialize());
app.use(passport.session());

// starting passport
import "./config/passport";

app.use("/auth", authRouter);
app.use(isAuthenticated());
app.use("/users", usersRouter);
app.use("/clients", clientRouter);
app.use("/projects", projectsRouter);
app.use("/tasks", tasksRouter);
app.use("/invoices", invoicesRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
