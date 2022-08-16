const express = require("express");
const router = express.Router();

class TasksRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.post("/mongo", this.controller.timeInsert.bind(this.controller));

    return router;
  }
}

module.exports = TasksRouter;
