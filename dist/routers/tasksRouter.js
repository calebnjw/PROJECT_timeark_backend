"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
class TasksRouter {
    constructor(controller) {
        this.controller = controller;
    }
    routes() {
        router
            .get("/", this.controller.getAllTasks.bind(this.controller))
            .post("/new", this.controller.createTask.bind(this.controller))
            .get("/:id", this.controller.getSingleTask.bind(this.controller))
            .put("/:id", this.controller.updateTask.bind(this.controller));
        // .delete("/:id", this.controller.deleteTask.bind(this.controller));
        return router;
    }
}
exports.default = TasksRouter;
