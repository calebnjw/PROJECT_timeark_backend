const express = require("express");
const router = express.Router();
const { Response: res, Request: req } = require("express");

router
  .get("/", (req, res) => {
    res.json({ msg: "all tasks" });
  })
  .get("/:id", (req, res) => {
    res.json({ msg: `show single task: ${req.params.id}` });
  })
  .post("/new", (req, res) => {
    res.json({ msg: "create a new task" });
  })
  .delete("/:id", (req, res) => {
    res.json({ msg: `delete task: ${req.params.id}` });
  });

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
