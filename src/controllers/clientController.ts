import { Request, Response } from "express";
import { Model } from "mongoose";

import IClients from "../interfaces/clients";

class ClientController {
  public model: Model<IClients>;
  constructor(model: Model<IClients>) {
    this.model = model;
  }

  async getClients(request: Request, response: Response) {
    try {
      const data = await this.model.find({});
      return response.status(200).json({ data });
    } catch (error) {
      console.log(error);
    }
  }

  async createClient(request: Request, response: Response) {
    try {
      const data = await this.model.create({ ...request.body });
      return response.status(201).json({ data });
    } catch (error) {
      console.log(error);
    }
  }
}

export default ClientController;
