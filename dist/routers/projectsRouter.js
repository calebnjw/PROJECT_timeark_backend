"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
class ProjectsRouter {
    constructor(controller) {
        this.controller = controller;
    }
    routes() {
        router
            .get("/", this.controller.getAllProjects.bind(this.controller))
            .post("/new", this.controller.createProject.bind(this.controller))
            .get("/:id", this.controller.getSingleProject.bind(this.controller))
            .put("/:id", this.controller.updateProject.bind(this.controller));
        // .delete("/:id", this.controller.deleteProject.bind(this.controller));
        return router;
    }
}
exports.default = ProjectsRouter;
