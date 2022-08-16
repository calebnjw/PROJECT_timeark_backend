import { Request, Response } from "express";

class TaskController {
  public model: any;
  constructor(model: any) {
    this.model = model;
  }

  async getAllTasks(req: Request, res: Response) {
    const tasks = await this.model.findAll();
    return res.json({ tasks });
  }

  async createTask(req: Request, res: Response) {
    const newTask = await this.model.create({ ...req.body });
    return res.json({ newTask });
  }

  async getSingleTask(req: Request, res: Response) {
    const task = await this.model.findById(req.params.id);
    return res.json({ task });
  }

  async updateTask(req: Request, res: Response) {
    const task = await this.model.findById(req.params.id);
    return res.json({ task });
  }

  async deleteTask(req: Request, res: Response) {
    const task = await this.model.findById(req.params.id);
    task.destroy();
    return res.json({ task });
  }
}

export default TaskController;
