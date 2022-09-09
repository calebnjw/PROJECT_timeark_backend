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
      .get("/time", this.controller.getTasksByTime.bind(this.controller))
      .post("/new", this.controller.createTask.bind(this.controller))
      .get("/:id", this.controller.getSingleTask.bind(this.controller))
      .put("/:id/update", this.controller.updateTask.bind(this.controller))
      .get(
        "/time/:selectedDate",
        this.controller.getTasksBySelectedDate.bind(this.controller)
      )
      .get(
        "/:id/timetrackings/:timetracking_id",
        this.controller.getSingleTimeTracking.bind(this.controller)
      )
      .post(
        "/:id/timetrackings",
        this.controller.addTimeTracking.bind(this.controller)
      )
      .post(
        "/:id/timetrackings/:timetracking_id/stop",
        this.controller.stopTimeTracking.bind(this.controller)
      )
      .put(
        "/:id/timetrackings/:timetracking_id/update",
        this.controller.updateTimeTracking.bind(this.controller)
      )
      .delete(
        "/:id/timetrackings/:timetracking_id",
        this.controller.deleteTimeTracking.bind(this.controller)
      );
    // .delete("/:id", this.controller.deleteTask.bind(this.controller));

    return router;
  }
}
