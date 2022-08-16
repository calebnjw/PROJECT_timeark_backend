const { Response: res, Request: req } = require("express");
const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

const addNewTask = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("task name is required");
  }

  const newTask = await Task.create(req.body);
  if (!newTask) {
    res.status(404);
    throw new Error("Task is not added.");
  }
  res.status(200).json(newTask);
});

const getSingleTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("No task found!");
  }
  res.status(200).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  res.json({ msg: `update task: ${req.params.id}` });
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task is not found!");
  }
  res.status(200).json({ msg: `Deleted task: ${req.params.id}`, task: task });
});

module.exports = {
  getTasks,
  getSingleTask,
  addNewTask,
  updateTask,
  deleteTask,
};
