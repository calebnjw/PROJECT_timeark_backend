import { Request, Response } from "express";

class TaskController {
  public model: any;
  constructor(model: any) {
    this.model = model;
  }

  async addNewTask(req: Request, res: Response) {
    const newTask = await this.model.create({ ...req.body });
    return res.json({ newTask });
  }
}

export default TaskController;
