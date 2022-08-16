console.log("hello world");

// // importing useful packages
// const express = require("express");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();

// // starting Mongo
// require("./model");

// // import Mongo Models
// const UserMongo = require("./model/users");
// const Task = require("./model/task");

// // initiate model
// const userMongo = new UserMongo();

// // import controllers
// const UsersController = require("./controllers/usersController.js");
// const TasksController = require("./controllers/tasksController");

// // initializing Controllers
// const userController = new UsersController(userMongo);
// const TaskController = new TasksController(Task);

// // import routers
// const UsersRouter = require("./routers/usersRouter");
// const TasksRouter = require("./routers/tasksRouter");

// // initialize routers
// const usersRouter = new UsersRouter(userController).routes();
// const tasksRouter = new TasksRouter(
//   TaskController
// ).routes();

// // below is where we put things together
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.set("view engine", "ejs");
// app.use(express.static("public"));
// app.use(cookieParser());
// let requestLogger = (req, res, next) => {
//   console.log("Request:");
//   console.log(req.body);
//   console.log(JSON.stringify(req.headers));
//   next();
//   console.log("Response:");
//   console.log(res.body);
//   console.log(JSON.stringify(res.headers));
// };

// app.use(requestLogger);

// app.use("/users", usersRouter);
// app.use("/timeTrackings", tasksRouter);

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => console.log(`App listening on post ${PORT}`));
