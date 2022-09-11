import { Request, Response } from "express";
import BSON from "BSON";
import { Model, ObjectId } from "mongoose";
import Project from "../models/project";
import IClients from "../interfaces/client";
import users from "../models/users";

class ClientController {
  public model: Model<IClients>;
  constructor(model: Model<IClients>) {
    this.model = model;
  }

  async getClients(request: Request, response: Response) {
    try {
      // const { user_id } = request.query;
      if (request.user) {
        const { id } = request.user;
        const data = await this.model.find({ user_id: id });
        if (data) {
          return response.status(200).json(data);
        } else {
          return response.json({ msg: "no client found" });
        }
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
      return response.status(500).json("no client found!");
    }
  }

  async createClient(request: Request, response: Response) {
    const clientDetails = request.body;

    try {
      const data = await this.model.create(clientDetails);
      return response.status(200).json(data);
    } catch (error) {
      return response.status(500).json("no client found!");
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
      return response.status(500).json("update client error");
    }
  }

  async deleteClient(request: Request, response: Response) {
    const { clientId } = request.params;
    try {
      // delete client from client table
      await this.model.findByIdAndDelete(clientId);
      // delete projects from with client id
      await Project.deleteMany({ client_id: clientId });
      return response.json("deleted client successfully");
    } catch (error) {
      console.log("Error message: ", error);
    }
  }
}

export default ClientController;
