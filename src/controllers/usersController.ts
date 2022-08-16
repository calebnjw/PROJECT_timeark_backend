import { Request, Response } from "express";

class UserController {
  public model: any;
  constructor(model: any) {
    this.model = model;
  }

  async createUser(req: Request, res: Response) {
    const newUser = await this.model.create({ ...req.body });
    return res.json({ newUser });
  }
}

export default UserController;
