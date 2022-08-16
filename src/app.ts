// importing useful packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

// starting mongo
import "./model";

// import Mongo Models
import UserModel from "./model/users";

// import controllers
import UsersController from "./controllers/usersController";

// initializing Controllers
const userController = new UsersController(UserModel);

// import routers
import UsersRouter from "./routers/usersRouter";

// initialize routers
const usersRouter = new UsersRouter(userController).routes();

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

const PORT: number | string = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App listening on post ${PORT}`));
