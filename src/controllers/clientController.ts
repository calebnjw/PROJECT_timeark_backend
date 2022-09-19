import { Request, Response } from "express";
import BSON from "BSON";
import { Model, ObjectId } from "mongoose";
import Project from "../models/project";
import IClients from "../interfaces/client";
import users from "../models/users";
import Task from "../models/task";

class ClientController {
  public model: Model<IClients>;
  constructor(model: Model<IClients>) {
    this.model = model;
  }

  async getClients(request: Request, response: Response) {
    try {
      if (request.user) {
        const { id } = request.user;
        const clients = await this.model.find({ user_id: id });
        if (clients) {
          return response.status(200).json({ success: true, clients });
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
    const userId = request.user?.id;
    const clientDetails = { ...request.body, user_id: userId };
    try {
      const newclient = await this.model.create(clientDetails);
      const user = await users.findById(userId);
      user?.client_ids?.push(newclient._id);
      await user?.save();
      return response.status(200).json({ success: true, newclient });
    } catch (error) {
      return response.status(500).json("no client found!");
    }
  }

  async updateClient(request: Request, response: Response) {
    const { clientId } = request.params;
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
      const client: any = await this.model.findByIdAndDelete(clientId);

      // delete tasks of projects
      const projectIds = client.project_ids;
      if (projectIds > 0) {
        projectIds.forEach(async (id: any) => {
          await Task.deleteMany({ project_id: id });
        });
        // delete projects from with client id
        await Project.deleteMany({ client_id: clientId });
      }
      //Remove client id from user's client_ids array
      const user = await users.updateOne(
        { _id: client.user_id },
        { $pull: { client_ids: clientId } }
      );
      return response
        .status(200)
        .json({ success: true, msg: "deleted client successfully" });
    } catch (error) {
      return response.status(500).json("delete client error");
    }
  }
}

export default ClientController;
