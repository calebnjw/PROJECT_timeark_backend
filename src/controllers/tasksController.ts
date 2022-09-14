import { Request, Response } from "express";
import { Model } from "mongoose";
import ITasks from "../interfaces/task";
import Project from "../models/project";
import Client from "../models/client";
import Task from "../models/task";
import ClientController from "./clientController";
import timeConversion from "../scripts/timeConversion";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import enGB from "date-fns/locale/en-GB";

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

  async getTaskByTime(req: Request, res: Response) {
    const { time_period } = req.query;
    try {
      const getUserClients = await Client.find({ user_id: req.user?.id });
      const clientList = getUserClients.map((c) => c._id);

      // Get projects by Client ID
      let projects = [];
      for (let i = 0; i < clientList.length; i++) {
        let project = await Project.find({ client_id: clientList[i] });
        projects.push(project);
      }

      // Get tasks by project ID
      let tasks = [];
      if (time_period === "week") {
        for (let i = 0; i < projects.length; i++) {
          for (let j = 0; j < projects[i].length; j++) {
            let task = await this.model.find({
              project_id: projects[i][j]._id,
              createdAt: {
                $gt: startOfWeek(new Date(), { weekStartsOn: 1, locale: enGB }),
                $lt: endOfWeek(new Date(), { weekStartsOn: 1, locale: enGB }),
              },
            });
            if (task.length) {
              tasks.push(task);
            }
          }
        }
      } else if (time_period === "month") {
        for (let i = 0; i < projects.length; i++) {
          for (let j = 0; j < projects[i].length; j++) {
            let task = await this.model.find({
              project_id: projects[i][j]._id,
              createdAt: {
                $gt: startOfMonth(new Date()),
                $lt: endOfMonth(new Date()),
              },
            });
            if (task.length) {
              tasks.push(task);
            }
          }
        }
      } else {
        for (let i = 0; i < projects.length; i++) {
          for (let j = 0; j < projects[i].length; j++) {
            let task = await this.model.find({
              project_id: projects[i][j]._id,
            });
            if (task.length) {
              tasks.push(task);
            }
          }
        }
      }
      const tasksArray = tasks.flat();
      const timeArray: any = [];
      tasksArray.map((t) => {
        let timeTaken: number = 0;
        t.time_trackings.map((e: any, idx) => {
          timeTaken += e.endDate - e.startDate;
          timeArray.push({ t, timeTaken });
        });
      });

      const ProjectTime: any = [];
      for (let i = 0; i < timeArray.length; i += 1) {
        ProjectTime.push({
          project_id: timeArray[i].t.project_id,
          timetaken: timeArray[i].timeTaken,
        });
      }
      function removeDuplicates(projectArr: any) {
        // shallow copy of project Arr
        let newArr = [...projectArr];
        // loop through newArr
        for (let i = 0; i < newArr.length; i += 1) {
          let temp = newArr[i];
          // let the first element be temp so that we can compare
          // start another loop
          for (let j = 1; j < newArr.length; j += 1) {
            // if first item project id is equal to 2nd item project id
            if (
              temp.project_id.toString() === newArr[j].project_id.toString()
            ) {
              // get the timetaken for the first item
              let currentToken = temp.timetaken;
              // get the time taken for the second item
              let token = newArr[j].timetaken;
              // remove the second item via splice
              newArr.splice(i, 1);
              // get a new total for item 1 time
              let newToken = currentToken + token;
              // assign the new total time to the first index
              newArr[j].timetaken = newToken;
            }
          }
        }
        // return back new Array
        return newArr;
      }
      const filteredList = removeDuplicates(ProjectTime);

      const projectsList = projects.flat();

      const nameTimeArray: any = [];

      // loop through filtered list
      // for (let i = 0; i < projectsList.length; i += 1) {
      //   if (String(projectsList[i]._id) == String(filteredList[i].project_id)) {
      //     nameTimeArray.push({
      //       name: projectsList[i].name,
      //       value: timeConversion(filteredList[i].timetaken),
      //     });
      //   }
      // }

      projectsList.forEach((pl) => {
        filteredList.forEach((fl) => {
          if (String(pl._id) == String(fl.project_id)) {
            nameTimeArray.push({
              name: pl.name,
              value: timeConversion(fl.timetaken),
            });
          }
        });
      });

      res.json({ nameTimeArray });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async getTasksBySelectedDate(req: Request, res: Response) {
    try {
      const { selectedDate } = req.params;
      const getUserClients = await Client.find({ user_id: req.user?.id });
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

  async getSingleTimeTracking(req: Request, res: Response) {
    try {
      const { id, timetracking_id } = req.params;
      const task = await this.model.findById(id);
      const time_tracking = task?.time_trackings.find(
        (t) => t._id == timetracking_id
      );

      return res.json({
        msg: "show single time tracking",
        task,
        time_tracking,
      });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async addTimeTracking(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const task = await this.model.findById(id);
      console.log("current task: ", task);
      const newTimeTracking: any = {
        startDate: new Date(),
      };
      task?.time_trackings.push(newTimeTracking);
      task?.save();
      const time_trackingsArr: any = task?.time_trackings;
      const newTimeTrackingId =
        time_trackingsArr[time_trackingsArr.length - 1]._id;

      console.log("updated task: ", task);
      const newTimeEntryWithTaskInfo: any = task?.time_trackings.find(
        (tt) => tt._id == newTimeTrackingId
      );
      const taskWithSingleTimeEntry = { ...task };
      taskWithSingleTimeEntry.time_trackings = [newTimeEntryWithTaskInfo];

      console.log("task with single time info: ", taskWithSingleTimeEntry);

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
        const updatedTask = await Task.updateOne(
          { _id: id },
          { $set: { "time_trackings.$[element].endDate": new Date() } },
          { arrayFilters: [{ "element._id": timetracking_id }] }
        );
        await task?.save();
        const getUpdatedTask = await this.model.findById(id);

        return res.json({ msg: "end date added", getUpdatedTask });
      } else {
        return res.json({ msg: "end date already exists" });
      }
    } catch (error) {
      console.log("Error message: ", error);
      return res.status(500).json("Internal server error");
    }
  }

  async updateTimeTracking(req: Request, res: Response) {
    try {
      const { id, timetracking_id } = req.params;
      const { updatedTimeSpent } = req.body;
      const task = await this.model.findById(id);
      const time_tracking = task?.time_trackings.find(
        (t) => t._id == timetracking_id
      );
      // update time tracking endDate:
      const currentStartDate: any = time_tracking?.startDate;
      const msSinceEpoch = new Date(currentStartDate).getTime();
      const updatedEndDate = new Date(
        msSinceEpoch + updatedTimeSpent * 60 * 60 * 1000
      );

      const updatedTask = await this.model.updateOne(
        { _id: id },
        { $set: { "time_trackings.$[element].endDate": updatedEndDate } },
        { arrayFilters: [{ "element._id": timetracking_id }] }
      );

      await task?.save();
      const getUpdatedTask = await this.model.findById(id);
      return res.json({ msg: "request received", getUpdatedTask });
    } catch (error) {
      console.log("Error message: ", error);
      return res.status(500).json("Internal server error");
    }
  }

  async deleteTimeTracking(req: Request, res: Response) {
    try {
      const { id, timetracking_id } = req.params;
      const result = await this.model.updateOne(
        { _id: id },
        {
          $pull: {
            time_trackings: { _id: timetracking_id },
          },
        }
      );

      const getUpdatedTask = await this.model.findById(id);
      return res.json({ msg: "time tracking record removed!" });
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
