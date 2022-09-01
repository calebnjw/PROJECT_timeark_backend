"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
class ClientsRouter {
    constructor(controller) {
        this.controller = controller;
    }
    routes() {
        router.get("/", this.controller.getClients.bind(this.controller));
        router.get("/:clientId", this.controller.getOneClient.bind(this.controller));
        router.put("/:clientId/update", this.controller.updateClient.bind(this.controller));
        router.post("/new", this.controller.createClient.bind(this.controller));
        return router;
    }
}
exports.default = ClientsRouter;
