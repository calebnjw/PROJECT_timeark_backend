import { Request, Response } from "express";
import { Model } from "mongoose";
import IInvoices from "../interfaces/invoice";
import Project from "../models/project";
import Client from "../models/client";
import project from "../models/project";
import Task from "../models/task";
import task from "../models/task";
import client from "../models/client";

class InvoiceController {
  public model: Model<IInvoices>;
  constructor(model: Model<IInvoices>) {
    this.model = model;
  }

  async getAllInvoices(req: Request, res: Response) {
    try {
      const { project_id } = req.query;
      const project: any = await Project.findById(project_id).populate(
        "invoice_ids"
      );

      const invoices = project.invoice_ids;
      return res.json({msg: "requested!", invoices })
    } catch (err) {
      console.log("Error message: ", err);
    }
  }

  async createInvoice(req: Request, res: Response) {    
    try {
      const { project_id, selectedMonth} = req.body;

      const selectedProject: any = await Project.findById(project_id).populate(
        "invoice_ids"
      );

      const issuedInvoices = selectedProject.invoice_ids;

      const existingInvoice = issuedInvoices.find((i:any) => i.month === selectedMonth)
      if(existingInvoice){
        return res.json({msg: "Invoice already issued for the month selected"})
      } else {
        const newInvoice = {
          project_id: project_id,
          paid: false,
          issuedDate: new Date(),
          overdue: false,
          month: selectedMonth
        }
        const newInvoiceDetails = await this.model.create(newInvoice);
        selectedProject?.invoice_ids.push(newInvoiceDetails._id);
        await selectedProject?.save()
        return res.json({ msg: "Added new invoice" });
      }
    } catch (err) {
      console.log("Error message: ", err);
      return res.json({ err: "Invoice not created" });

    }
  }

  async getSingleInvoice(req: Request, res: Response) {
    try {
      const invoice = await this.model.findById(req.params.invoice_id);
      return res.json({ invoice });
    } catch (err) {
      console.log("Error message: ", err);
    }
  }
}

export default InvoiceController;
