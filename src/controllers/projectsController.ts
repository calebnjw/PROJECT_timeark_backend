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
      // const clientId = mongoose.Types.ObjectId(client_id);
      // console.log("client id:", client_id);
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
      const project = await this.model.findById(req.params.id);
      if (project) {
        return res.json({ project });
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
      console.log("updated Project: ", project);
      return res.json({ msg: "Project updated" });
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
