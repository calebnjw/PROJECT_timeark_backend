import { Request, Response } from "express";
import BSON from "BSON";
import { Model, ObjectId } from "mongoose";

import IClients from "../interfaces/client";

class ClientController {
  public model: Model<IClients>;
  constructor(model: Model<IClients>) {
    this.model = model;
  }

  async getClients(request: Request, response: Response) {
    try {
      const data = await this.model.find({});
      return response.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getOneClient(request: Request, response: Response) {
    const { clientId } = request.params;

    try {
      // create new BSON.ObjectId to search MongoDB
      const data = await this.model.find({ _id: new BSON.ObjectId(clientId) });
      return response.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  async createClient(request: Request, response: Response) {
    const clientDetails = request.body;

    try {
      const data = await this.model.create(clientDetails);
      return response.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  async updateClient(request: Request, response: Response) {
    const { clientId } = request.params;
    const clientDetails = request.body;

    try {
      const data = await this.model.replaceOne(
        { _id: new BSON.ObjectId(clientId) },
        clientDetails
      );
      return response.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ClientController;