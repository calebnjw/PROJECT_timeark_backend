import express from "express";
const router = express.Router();

export default class UsersRouter {
  public controller: any;
  constructor(controller: any) {
    this.controller = controller;
  }

  routes() {
    router
      .get("/", this.controller.getAllTasks.bind(this.controller))
      .post("/new", this.controller.createTask.bind(this.controller))
      .get("/:id", this.controller.getSingleTask.vind(this.controller))
      .put("/:id", this.controller.updateTask.bind(this.controller))
      .delete("/:id", this.controller.deleteTask.bind(this.controller));

    return router;
  }
}
