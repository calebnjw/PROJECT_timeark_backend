// importing useful packages
import bcrypt from "bcrypt";
import BSON from "BSON";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { request } from "express";
import expressSession from "express-session";
import passport from "passport";
import passportLocal from "passport-local";

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
app.use(cookieParser());

const SALT = Number(process.env.SALT_ROUNDS);
const SECRET = process.env.GOOGLE_CLIENT_SECRET;

app.use(
  expressSession({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = passportLocal.Strategy;

export default passport.use(
  new LocalStrategy((username, password, done) => {
    UserModel.findOne({ username: username }, (error: Error, user: any) => {
      if (error) throw error;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) throw error;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

// saves user id in request.session.passport.user.
passport.serializeUser((user: any, done) => {
  console.log(user);
  done(null, user.id);
});

// then takes request.session.passport.user.id
// looks up user information in
passport.deserializeUser((id: string, done) => {
  console.log(id);
  UserModel.findOne({ _id: new BSON.ObjectId(id) }, (error, user: any) => {
    const userInformation = {
      username: user.username,
    };
    done(error, userInformation);
  });
});

// app.use("/users", usersRouter);
app.use("/clients", clientRouter);
app.use("/projects", projectsRouter);
app.use("/tasks", tasksRouter);

app.post("/register", (request, response) => {
  const { username, password, first_name, last_name, email } = request?.body; // question mark in the event of empty body

  // if empty username / password fields
  if (!username || !password) {
    return response.json({ success: false, message: "Invalid username or password." });
  }

  // verify that there are no exising users
  UserModel.findOne({ username }, async (error: Error, document: any) => {
    if (error) throw error;
    if (document) {
      return response.json({ success: false, message: "Existing user. Please sign in." });
    } else {
      const hashedPassword: string = await bcrypt.hash(password, SALT);
      const newUser = new UserModel({
        username,
        password: hashedPassword,
        first_name,
        last_name,
        email,
      });

      await newUser.save();
      return response.json({ success: true, user: newUser });
    }
  });
});

app.post("/login", passport.authenticate("local"), (request, response) => {
  return response.json({ success: true });
});

app.get("/user", (request, response) => {
  return response.json({ user: request.user });
});

const PORT: number | string = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
