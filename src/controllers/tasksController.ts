import { request, Request, Response } from "express";
import { Model } from "mongoose";
import ITasks from "../interfaces/task";
import Project from "../models/project";

class TaskController {
  public model: Model<ITasks>;
  constructor(model: Model<ITasks>) {
    this.model = model;
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const { project_id } = req.query;
      console.log("project id: ", project_id);
      const project: any = await Project.findById(project_id).populate(
        "task_ids"
      );
      const tasks = project.task_ids;
      return res.json({ tasks });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const { project_id } = req.body;
      const project: any = await Project.findById(project_id);
      // Need to Check if client.user_id === current user!!!
      const newTask = await this.model.create({ ...req.body });
      project.task_ids.push(newTask.id);
      await project.save();
      return res.json({ msg: "Added new task" });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async getSingleTask(req: Request, res: Response) {
    try {
      const task = await this.model.findById(req.params.id);
      return res.json({ task });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async getTasksByDate(req: Request, res: Response) {
    const { selectedDate } = req.body;
    console.log(typeof selectedDate);
    try {
      const task = await this.model.find({
        date: selectedDate,
      });
      return res.json({ task });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const task = await this.model.findByIdAndUpdate(req.params.id, req.body);
      return res.json({ msg: "Task updated" });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async getTaskByProjects(req: Request, res: Response) {
    try {
      // Get current user id from params, the get all users client_ids list, To be added
      const clientList = [
        "62fe4390abda69110eda75e5",
        "62fe48248afea2260d3a178d",
        "62fe4974f2fbc95a483cb11c",
        "6303868c92a52dcf23bcc860",
        "6303869c92a52dcf23bcc863",
      ];

      // Get projects by Client ID
      let projects = [];
      for (let i = 0; i < clientList.length; i++) {
        let project = await Project.find({ client_id: clientList[i] });
        projects.push(project);
      }

      // Get tasks by project ID
      let tasks = [];
      for (let i = 0; i < projects.length; i++) {
        for (let j = 0; j < projects[i].length; j++) {
          let task = await this.model.find({ project_id: projects[i][j]._id });
          if (task.length) {
            tasks.push(task);
          }
        }
      }

      const tasksArray = tasks.flat();

      res.json({ tasksArray });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async getTasksBySelectedDate(req: Request, res: Response) {
    try {
      const { selectedDate } = req.params;
      // Get current user id from params, the get all users client_ids list, To be added
      const clientList = [
        "62fe4390abda69110eda75e5",
        "62fe48248afea2260d3a178d",
        "62fe4974f2fbc95a483cb11c",
        "6303868c92a52dcf23bcc860",
        "6303869c92a52dcf23bcc863",
      ];

      // Get projects by Client ID
      let projects = [];
      for (let i = 0; i < clientList.length; i++) {
        let project = await Project.find({ client_id: clientList[i] });
        projects.push(project);
      }

      // Get tasks by project ID
      let tasks = [];
      for (let i = 0; i < projects.length; i++) {
        for (let j = 0; j < projects[i].length; j++) {
          let task = await this.model.find({ project_id: projects[i][j]._id });
          if (task.length) {
            tasks.push(task);
          }
        }
      }

      // Convert date to string
      function formatDate(date: Date) {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [year, month, day].join("-");
      }

      const tasksArr = tasks.flat();

      // Sort out tasks by selected date
      const tasksBySelectedDate = tasksArr.filter((task) => {
        let temp = task.time_tracking.filter(
          (time) => formatDate(time.date) === selectedDate
        );
        if (temp.length) {
          return (task.time_tracking = temp);
        }
      });

      if (tasksBySelectedDate.length) {
        return res.json({ tasksBySelectedDate });
      } else {
        return res.json({ msg: `No task found on selected date` });
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async addNewTime(req: Request, res: Response) {
    try {
      const { task_id } = req.query;
      // console.log("task id: ", task_id);
      const task = await this.model.findById(task_id);
      // console.log("task: ", task);
      console.log("body: ", req.body);
      const newTime = req.body;
      task?.time_tracking.push(newTime);
      task?.save();
      return res.json({ task });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  //TBD: need to discuss if we need delete task function
  // async deleteTask(req: Request, res: Response) {
  //   try {
  //     const task = await this.model.findByIdAndDelete(req.params.id);
  //     return res.json({ task });
  //   } catch (error) {
  //     console.log("Error message: ", error);
  //   }
  // }
}

export default TaskController;
