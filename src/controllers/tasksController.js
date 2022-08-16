const { Response: res, Request: req } = require("express");

const getTasks = (req, res) => {
  res.json({ msg: "all tasks" });
};

const getSingleTask = (req, res) => {
  res.json({ msg: `show single task: ${req.params.id}` });
};

const addNewTask = (req, res) => {
  res.json({ msg: "create a new task" });
};

const updateTask = (req, res) => {
  res.json({ msg: `update task: ${req.params.id}` });
};

const deleteTask = (req, res) => {
  res.json({ msg: `delete task: ${req.params.id}` });
};

module.exports = {
  getTasks,
  getSingleTask,
  addNewTask,
  updateTask,
  deleteTask,
};

// const BaseController = require("./baseController");

// class TaskController extends BaseController {
//   constructor(model) {
//     super(model);
//     // this.userMongo = userMongo
//   }

//   async timeInsert(req, res) {
//     const newTask = await this.model.createOne({ ...req.body });
//     // const userCheck = await this.userMongo.findById(newUser._id)
//     return res.json({ newUser });
//   }
// }

// module.exports = TaskController;
