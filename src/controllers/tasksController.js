const { Response: res, Request: req } = require("express");

const getTasks = (req, res) => {
  res.status(200).json({ msg: "all tasks" });
};

const addNewTask = (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("task name is required");
  }
  res.status(201).json({ msg: "create a new task" });
};

const getSingleTask = (req, res) => {
  res.json({ msg: `show single task: ${req.params.id}` });
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
