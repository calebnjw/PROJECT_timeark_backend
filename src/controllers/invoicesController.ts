import { Request, Response } from "express";
import { Model } from "mongoose";
import IInvoices from "../interfaces/invoice";
import Project from "../models/project";
import Client from "../models/client";

class InvoiceController {
  public model: Model<IInvoices>;
  constructor(model: Model<IInvoices>) {
    this.model = model;
  }
  async getAllProjects(req: Request, res: Response) {
    try {
      //am I doing this part right?
      const { client_id } = req.query;
      console.log("Client_id: ", client_id);
      const client: any = await Client.findById(client_id).populate(
        "project_ids"
      );
      const projects = client.project_ids;
      return res.json({ projects });
    } catch (err) {
      console.log("Error message: ", err);
    }
  }

  async getAllInvoices(req: Request, res: Response) {
    try {
      const { project_id } = req.query;
      console.log("Project id: ", project_id);
      const project: any = await Project.findById(project_id).populate(
        "invoice_ids"
      );
      const invoices = project.invoice_ids;
      return res.json({ invoices });
    } catch (err) {
      console.log("Error message: ", err);
    }
  }

  async getSingleInvoice(req: Request, res: Response) {
    try {
      const invoice = await this.model.findById(req.params.id);
      return res.json({ invoice });
    } catch (err) {
      console.log("Error message: ", err);
    }
  }
}

export default InvoiceController;
