import { Request, Response } from "express";
import { isObjectIdOrHexString, Model } from "mongoose";
import ITasks from "../interfaces/task";
import Project from "../models/project";
import Client from "../models/client";
import Task from "../models/task";
import ClientController from "./clientController";

class TaskController {
  public model: Model<ITasks>;
  constructor(model: Model<ITasks>) {
    this.model = model;
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const { project_id } = req.query;
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
      return res.json({ msg: "Added new task", newTask });
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

  async updateTask(req: Request, res: Response) {
    try {
      const task = await this.model.findByIdAndUpdate(req.params.id, req.body);
      return res.json({ msg: "Task updated" });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async getTasksBySelectedDate(req: Request, res: Response) {
    try {
      const { selectedDate } = req.params;
      const { user_id } = req.query;
      console.log("user id: ", user_id);
      const getUserClients = await Client.find({ user_id: user_id });
      const clientList = getUserClients.map((c) => c._id);

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
        let temp = task.time_trackings.filter(
          (time) => formatDate(time.startDate) === selectedDate
        );
        if (temp.length) {
          return (task.time_trackings = temp);
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

  async addTimeTracking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await this.model.findById(id);
      const newTimeTracking: any = {
        startDate: new Date(),
      };
      task?.time_trackings.push(newTimeTracking);
      await task?.save();
      const time_trackingsArr: any = task?.time_trackings;
      const newTimeTrackingId =
        time_trackingsArr[time_trackingsArr.length - 1]._id;

      return res.json({ newTimeTrackingId, task });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async stopTimeTracking(req: Request, res: Response) {
    try {
      const { id, timetracking_id } = req.params;
      const task = await this.model.findById(id);

      const time_tracking = task?.time_trackings.find(
        (t) => t._id == timetracking_id
      );

      if (!time_tracking?.endDate) {
        console.debug("no date found");
        const updatedTask = await this.model.updateOne(
          { _id: id },
          { $set: { "time_trackings.$[element].endDate": new Date() } },
          { arrayFilters: [{ "element._id": timetracking_id }] }
        );

        await task?.save();
        const getUpdatedTask = await this.model.findById(id);
        console.log("updated task: ", getUpdatedTask);

        return res.json({ msg: "end date added", getUpdatedTask });
      } else {
        console.info("date found");
        return res.json({ msg: "end date already exists" });
      }
    } catch (error) {
      console.log("Error message: ", error);
      return res.status(500).json("Internal server error");
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
