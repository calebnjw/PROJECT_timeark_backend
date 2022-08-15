// importing useful packages
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// starting Mongo
require("./model");

// import Mongo Models
const UserMongo = require("./model/users");
const TimeTracking = require("./model/timeTrackings");

// initiate model
const userMongo = new UserMongo();

// import controllers
const UsersController = require("./controllers/usersController.js");
const TimeTrackingsController = require("./controllers/timeTrackingsController");

// initializing Controllers
const userController = new UsersController(userMongo);
const TimeTrackingController = new TimeTrackingsController(TimeTracking);

// import routers
const UsersRouter = require("./routers/usersRouter");
const TimeTrackingsRouter = require("./routers/timeTrackingsRouter");

// initialize routers
const usersRouter = new UsersRouter(userController).routes();
const timeTrackingsRouter = new TimeTrackingsRouter(
  TimeTrackingController
).routes();

// below is where we put things together
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/timeTrackings", timeTrackingsRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App listening on post ${PORT}`));
