import express from "express";

const router = express.Router();

export default class UsersRouter {
  public controller: any;
  constructor(controller: any) {
    this.controller = controller;
  }

  routes() {
    router.get("/log", this.controller.logUser.bind(this.controller));
    router.get("/logout", this.controller.logoutUser.bind(this.controller));
    router.get("/user", this.controller.getUser.bind(this.controller));

    router.put("/update", this.controller.updateUser.bind(this.controller));

    router.delete("/delete", this.controller.deleteUser.bind(this.controller));
    return router;
  }
}
