// importing useful packages
import bcrypt from "bcrypt";
import BSON from "BSON";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { request } from "express";
import expressSession from "express-session";
import passport from "passport";

dotenv.config();

const PORT: number | string = process.env.PORT || 8080;
const SALT: number = Number(process.env.SALT_ROUNDS) || 10;
const SECRET: string = process.env.GOOGLE_CLIENT_SECRET;
const FRONTEND_URL: string = process.env.FRONTEND_URL;

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
    origin: FRONTEND_URL,
  })
);
app.use(cookieParser());

app.use(
  expressSession({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost/${PORT}/auth/google`,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

// AUTHENTICATE FUNCTION
// (username, password, done) => {
//   UserModel.findOne({ username: username }, (error: Error, user: any) => {
//     if (error) throw error;
//     if (!user) return done(null, false);
//     bcrypt.compare(password, user.password, (error, result) => {
//       if (error) throw error;
//       if (result === true) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     });
//   });
// };

// saves user id in request.session.passport.user.
passport.serializeUser(UserModel.serializeUser());

// then takes request.session.passport.user.id
// looks up user information in
passport.deserializeUser(UserModel.deserializeUser());

// SERIALISE FUNCTION
// (user: any, done) => {
//   console.log(user);
//   done(null, user.id);
// };

// DESERIALISE FUNCTION
// (id: string, done) => {
//   console.log(id);
//   UserModel.findOne({ _id: new BSON.ObjectId(id) }, (error, user: any) => {
//     const userInformation = {
//       username: user.username,
//     };
//     done(error, userInformation);
//   });
// };

// app.use("/users", usersRouter);
app.use("/clients", clientRouter);
app.use("/projects", projectsRouter);
app.use("/tasks", tasksRouter);

app.post("/register");

app.post("/login", passport.authenticate("local"), (request, response) => {
  return response.json({ success: true });
});

app.get("/user", (request, response) => {
  return response.json({ user: request.user });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
