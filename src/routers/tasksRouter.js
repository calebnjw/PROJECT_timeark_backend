const express = require("express");
const router = express.Router();
const { Response: res, Request: req } = require("express");
const {
  getTasks,
  getSingleTask,
  addNewTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

router
  .get("/", getTasks)
  .get("/:id", getSingleTask)
  .post("/new", addNewTask)
  .put("/:id", updateTask)
  .delete("/:id", deleteTask);

module.exports = router;

// class TasksRouter {
//   constructor(controller) {
//     this.controller = controller;
//   }
//   routes() {
//     router.post("/mongo", this.controller.timeInsert.bind(this.controller));

//     return router;
//   }
// }

// module.exports = TasksRouter;
