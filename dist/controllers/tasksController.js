"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = __importDefault(require("../models/project"));
class TaskController {
    constructor(model) {
        this.model = model;
    }
    getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { project_id } = req.query;
                console.log("project id: ", project_id);
                const project = yield project_1.default.findById(project_id).populate("task_ids");
                const tasks = project.task_ids;
                return res.json({ tasks });
            }
            catch (error) {
                console.log("Error message: ", error);
            }
        });
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { project_id } = req.body;
                const project = yield project_1.default.findById(project_id);
                // Need to Check if client.user_id === current user!!!
                const newTask = yield this.model.create(Object.assign({}, req.body));
                project.task_ids.push(newTask.id);
                yield project.save();
                return res.json({ msg: "Added new task" });
            }
            catch (error) {
                console.log("Error message: ", error);
            }
        });
    }
    getSingleTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.model.findById(req.params.id);
                return res.json({ task });
            }
            catch (error) {
                console.log("Error message: ", error);
            }
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.model.findByIdAndUpdate(req.params.id, req.body);
                console.log("updated Task: ", task);
                return res.json({ msg: "Task updated" });
            }
            catch (error) {
                console.log("Error message: ", error);
            }
        });
    }
}
exports.default = TaskController;
