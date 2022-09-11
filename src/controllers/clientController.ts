import { Request, Response } from "express";
import BSON from "BSON";
import { Model, ObjectId } from "mongoose";

import IClients from "../interfaces/client";
import users from "../models/users";

class ClientController {
  public model: Model<IClients>;
  constructor(model: Model<IClients>) {
    this.model = model;
  }

  async getClients(request: Request, response: Response) {
    try {
      const { user_id } = request.query;
      console.log(user_id);
      const data = await this.model.find({ user_id: user_id });
      if (data) {
        return response.status(200).json(data);
      } else {
        return response.json({ msg: "no client found" });
      }
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
    // console.log(request.body);
    const clientDetails = request.body;

    try {
      const data = await this.model.updateOne(
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
