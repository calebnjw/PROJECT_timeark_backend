import { Request, Response } from "express";
import { Model } from "mongoose";
import IUsers from "../interfaces/user";

class UserController {
  public model: Model<IUsers>;
  constructor(model: Model<IUsers>) {
    this.model = model;
  }

  async createUser(req: Request, res: Response) {
    const newUser = await this.model.create({ ...req.body });
    return res.json({ newUser });
  }
}

export default UserController;
