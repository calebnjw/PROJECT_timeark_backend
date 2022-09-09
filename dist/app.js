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
// import passport from "./config/passport/passport";
// starting mongo
require("./models");
// import Mongo Models
const users_1 = __importDefault(require("./models/users"));
const client_1 = __importDefault(require("./models/client"));
const project_1 = __importDefault(require("./models/project"));
const task_1 = __importDefault(require("./models/task"));
const invoice_1 = __importDefault(require("./models/invoice"));
// import controllers
const usersController_1 = __importDefault(require("./controllers/usersController"));
const clientController_1 = __importDefault(require("./controllers/clientController"));
const projectsController_1 = __importDefault(require("./controllers/projectsController"));
const tasksController_1 = __importDefault(require("./controllers/tasksController"));
const invoicesController_1 = __importDefault(require("./controllers/invoicesController"));
// initializing Controllers
const userController = new usersController_1.default(users_1.default);
const clientController = new clientController_1.default(client_1.default);
const ProjectController = new projectsController_1.default(project_1.default);
const TaskController = new tasksController_1.default(task_1.default);
const InvoiceController = new invoicesController_1.default(invoice_1.default);
const clientRouter_1 = __importDefault(require("./routers/clientRouter"));
const projectsRouter_1 = __importDefault(require("./routers/projectsRouter"));
const tasksRouter_1 = __importDefault(require("./routers/tasksRouter"));
const invoicesRouter_1 = __importDefault(require("./routers/invoicesRouter"));
// initialize routers
// const usersRouter = new UsersRouter(userController, passport).routes();
const clientRouter = new clientRouter_1.default(clientController).routes();
const projectsRouter = new projectsRouter_1.default(ProjectController).routes();
const tasksRouter = new tasksRouter_1.default(TaskController).routes();
const invoicesRouter = new invoicesRouter_1.default(InvoiceController).routes();
// below is where we put things together
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
// app.use("/users", usersRouter);
app.use("/clients", clientRouter);
app.use("/projects", projectsRouter);
app.use("/tasks", tasksRouter);
app.use("/invoices", invoicesRouter);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
