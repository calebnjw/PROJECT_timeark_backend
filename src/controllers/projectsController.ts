import { Request, Response } from "express";
import { Model } from "mongoose";
import IProjects from "../interfaces/project";
import IClients from "../interfaces/client";
import Client from "../models/client";

class ProjectController {
  public model: Model<IProjects>;
  constructor(model: Model<IProjects>) {
    this.model = model;
  }

  async getAllProjects(req: Request, res: Response) {
    const projects = await this.model.find({});
    return res.json({ projects });
  }

  async createProject(req: Request, res: Response) {
    const { client_id } = req.body;
    console.log("client id: ", client_id);
    const client: any = await Client.findById(client_id);
    console.log("client details:", client);

    // Need to Check client.user_id === current user

    console.log("project body: ", req.body);
    const newProject = await this.model.create({ ...req.body });

    console.log("new project id: ", newProject.id);

    client.project_ids.push(newProject.id);
    await client.save();

    console.log("updated client:", client);
    return res.json({});
    // return res.json({ newProject });
  }

  async getSingleProject(req: Request, res: Response) {
    const project = await this.model.findById(req.params.id);
    return res.json({ project });
  }

  async updateProject(req: Request, res: Response) {
    console.log("project updated: ", { ...req.body });
    const project = await this.model.findByIdAndUpdate(req.params.id, req.body);
    return res.json({ project });
  }

  async deleteProject(req: Request, res: Response) {
    const project = await this.model.findByIdAndDelete(req.params.id);
    return res.json({ project });
  }
}

export default ProjectController;
