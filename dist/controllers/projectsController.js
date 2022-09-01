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
const client_1 = __importDefault(require("../models/client"));
class ProjectController {
    constructor(model) {
        this.model = model;
    }
    getAllProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { client_id } = req.query;
                const client = yield client_1.default.findById(client_id).populate("project_ids");
                const projects = client.project_ids;
                return res.json({ projects });
            }
            catch (error) {
                console.log("Error message: ", error);
            }
        });
    }
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { client_id } = req.body;
                const client = yield client_1.default.findById(client_id);
                // Need to Check if client.user_id === current user!!!
                const newProject = yield this.model.create(Object.assign({}, req.body));
                client.project_ids.push(newProject.id);
                yield client.save();
                return res.json({ msg: "Added new project" });
            }
            catch (error) {
                console.log("Error message: ", error);
            }
        });
    }
    getSingleProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield this.model.findById(req.params.id);
                return res.json({ project });
            }
            catch (error) {
                console.log("Error message: ", error);
            }
        });
    }
    updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield this.model.findByIdAndUpdate(req.params.id, req.body);
                console.log("updated Project: ", project);
                return res.json({ msg: "Project updated" });
            }
            catch (error) {
                console.log("Error message: ", error);
            }
        });
    }
}
exports.default = ProjectController;
