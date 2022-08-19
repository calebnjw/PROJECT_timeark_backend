"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
class UsersRouter {
    constructor(controller, passport) {
        this.controller = controller;
        this.passport = passport;
    }
    routes() {
        router.get("/auth/google", this.passport.authenticate("google", { scope: ["profile"] }));
        router.get("/auth/redirect/google", this.passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => res.redirect("/app"));
        // router.post("/mongo", this.controller.createUser.bind(this.controller));
        return router;
    }
}
exports.default = UsersRouter;
