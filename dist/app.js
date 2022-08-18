"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importing useful packages
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// starting mongo
require("./model");
// import Mongo Models
const users_1 = __importDefault(require("./model/users"));
const tasks_1 = __importDefault(require("./model/tasks"));
// import controllers
const usersController_1 = __importDefault(require("./controllers/usersController"));
const tasksController_1 = __importDefault(require("./controllers/tasksController"));
// initializing Controllers
const userController = new usersController_1.default(users_1.default);
const TaskController = new tasksController_1.default(tasks_1.default);
// import routers
const usersRouter_1 = __importDefault(require("./routers/usersRouter"));
const tasksRouter_1 = __importDefault(require("./routers/tasksRouter"));
// initialize routers
const usersRouter = new usersRouter_1.default(userController).routes();
const tasksRouter = new tasksRouter_1.default(TaskController).routes();
// below is where we put things together
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App listening on post ${PORT}`));
