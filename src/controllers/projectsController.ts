import { Request, Response } from "express";
import { Model } from "mongoose";
import IProjects from "../interfaces/project";

class TaskController {
  public model: Model<IProjects>;
  constructor(model: Model<IProjects>) {
    this.model = model;
  }

  async getAllProjects(req: Request, res: Response) {
    const projects = await this.model.find({});
    return res.json({ projects });
  }

  async createProject(req: Request, res: Response) {
    const newProject = await this.model.create({ ...req.body });
    return res.json({ newProject });
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

export default TaskController;
