import express from "express";
const router = express.Router();

export default class TasksRouter {
  public controller: any;
  constructor(controller: any) {
    this.controller = controller;
  }

  routes() {
    router
      .get("/", this.controller.getAllTasks.bind(this.controller))
      .post("/new", this.controller.createTask.bind(this.controller))
      .get("/:id", this.controller.getSingleTask.bind(this.controller))
      .put("/:id/update", this.controller.updateTask.bind(this.controller))
      .get(
        "/time/:selectedDate",
        this.controller.getTasksBySelectedDate.bind(this.controller)
      );
    // .delete("/:id", this.controller.deleteTask.bind(this.controller));

    return router;
  }
}
