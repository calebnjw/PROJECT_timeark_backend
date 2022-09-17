import { Request, Response } from "express";
import { Model } from "mongoose";
import IProjects from "../interfaces/project";
import IClients from "../interfaces/client";
import Client from "../models/client";
import Project from "../models/project";
import mongoose from "mongoose";

class ProjectController {
  public model: Model<IProjects>;
  constructor(model: Model<IProjects>) {
    this.model = model;
  }

  async getAllProjects(req: Request, res: Response) {
    try {
      const { client_id } = req.query;
      if (client_id) {
        const client: any = await Client.findById(client_id).populate(
          "project_ids"
        );
        const projects = client.project_ids;
        return res.json({ projects });
      } else {
        return res.json({ msg: "client_id missing" });
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async createProject(req: Request, res: Response) {
    try {
      const { client_id } = req.body;
      const client: any = await Client.findById(client_id);
      // Need to Check if client.user_id === current user!!!
      const newProject = await this.model.create({ ...req.body });
      client.project_ids.push(newProject.id);
      await client.save();
      return res.json({ msg: "Added new project", project_id: newProject.id });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async getSingleProject(req: Request, res: Response) {
    try {
      const project = await this.model
        .findById(req.params.id)
        .populate("task_ids");
      // Calculate time and earings
      // console.log("project: ", project);
      const tasks = project?.task_ids;
      const filteredTasks = tasks?.filter(
        (t: any) => t.time_trackings.length > 0
      );
      console.log("filteredTasks: ", filteredTasks);

      const taskTimeEarnings = filteredTasks?.map((t: any) => {
        let timeArr;
        if (t.time_trackings.length > 0) {
          timeArr = t.time_trackings.map((tt: any) => {
            const timeDiff =
              new Date(tt.endDate).getTime() - new Date(tt.startDate).getTime();
            const getHours = timeDiff / (1000 * 60 * 60);
            return getHours;
          });
        }
        console.log("timeArr: ", timeArr);
        const sumOfTime = timeArr.reduce((a: any, b: any) => a + b);
        const earings = sumOfTime * Number(project?.rate);
        return { value: earings, name: t.name };
      });
      console.log("taskTimeEarnings: ", taskTimeEarnings);

      if (project) {
        return res.json({ project, taskTimeEarnings });
      } else {
        return res.json({ msg: "no project created!" });
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const project = await this.model.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      // console.log("updated Project: ", project);
      return res.json({ msg: "Project updated" });
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async getUsersAllProjects(req: Request, res: Response) {
    try {
      // const { user_id } = req.query;
      console.log("user id: ", req.user?.id);
      const clients = await Client.find({ user_id: req.user?.id }).populate(
        "project_ids"
      );
      const getProjects = clients.map((c) => {
        return c.project_ids;
      });

      console.log("projects: ", getProjects);

      const projects = getProjects.flat();
      if (projects.length) {
        return res.json({
          msg: "request all user's projects received",
          projects,
        });
      } else {
        return res.json({ msg: "User has no project" });
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  // TBD: need to discuss if we need delete project function
  // async deleteProject(req: Request, res: Response) {
  //   try {
  //     const project = await this.model.findByIdAndDelete(req.params.id);
  //     return res.json({ project });
  //   } catch (error) {
  //     console.log("Error message: ", error);
  //   }
  // }
}

export default ProjectController;
