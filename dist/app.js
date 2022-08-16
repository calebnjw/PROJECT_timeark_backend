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
// starting Mongo
// import Mongo Models
const users_1 = __importDefault(require("./model/users"));
// import controllers
const usersController_1 = __importDefault(require("./controllers/usersController"));
// initializing Controllers
const userController = new usersController_1.default(users_1.default);
// import routers
const usersRouter_1 = __importDefault(require("./routers/usersRouter"));
// initialize routers
const usersRouter = new usersRouter_1.default(userController).routes();
// below is where we put things together
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
app.use("/users", usersRouter);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App listening on post ${PORT}`));
