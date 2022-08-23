import { Request, Response } from "express";
import { Model } from "mongoose";
import IInvoices from "../interfaces/invoice";
import Project from "../models/project";

class InvoiceController {
  public model: Model<IInvoices>;
  constructor(model: Model<IInvoices>) {
    this.model = model;
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

  async createInvoice(req: Request, res: Response) {
    //get date start of month to end of month, multiple task hours with rate
    try {
      const { project_id } = req.body;
      const project: any = await Project.findById(project_id);
      const newInvoice = await this.model.create({ ...req.body });
      project.invoice_ids.push(newInvoice.id);
      await project.save();
      return res.json({ msg: "Added new invoice" });
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
