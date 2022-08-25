"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importing useful packages
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
// starting mongo
require("./models");
// import Mongo Models
const users_1 = __importDefault(require("./models/users"));
const project_1 = __importDefault(require("./models/project"));
const client_1 = __importDefault(require("./models/client"));
// import controllers
const usersController_1 = __importDefault(require("./controllers/usersController"));
const projectsController_1 = __importDefault(require("./controllers/projectsController"));
const clientController_1 = __importDefault(require("./controllers/clientController"));
// initializing Controllers
const clientController = new clientController_1.default(client_1.default);
const userController = new usersController_1.default(users_1.default);
const ProjectController = new projectsController_1.default(project_1.default);
// initialize routers
const usersRouter_1 = __importDefault(require("./routers/usersRouter"));
const clientRouter_1 = __importDefault(require("./routers/clientRouter"));
const projectsRouter_1 = __importDefault(require("./routers/projectsRouter"));
// import routers
const usersRouter = new usersRouter_1.default(userController, passport_1.default).routes();
const projectsRouter = new projectsRouter_1.default(ProjectController).routes();
const clientRouter = new clientRouter_1.default(clientController).routes();
// below is where we put things together
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/users", usersRouter);
app.use("/clients", clientRouter);
app.use("/projects", projectsRouter);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
