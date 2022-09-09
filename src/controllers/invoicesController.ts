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
      console.log("Project id,getallinvoices: ", project_id);
      const project: any = await Project.findById(project_id).populate(
        "invoice_ids"
      );
      console.log("Projectvariable", project)

      const invoices = project.invoice_ids;
      console.log('invoices: ', invoices)
      // return res.json({ invoices });
      return res.json({msg: "requested!", invoices })
    } catch (err) {
      console.log("Error message: ", err);
    }
  }

  async createInvoice(req: Request, res: Response) {    
    try {
      const { project_id, selectedMonth} = req.body;
      //get all tasks from the project id 
      const project: any = await Project.findById(project_id)
      console.log("project id", project_id)   
      console.log("month", selectedMonth) 
      console.log("projectcreatinvoice", project)

      //info needed to create invoice as json file
      const newInvoiceDetails = {
        project_id,
        month: selectedMonth,
        paid: true,
        overdue: false
      }
      const newInvoice = await this.model.create(newInvoiceDetails);
      await newInvoice.save();
      if (typeof project.invoices === "undefined"){
        project.invoices=[]
      }
      if (typeof project.invoice_ids === "undefined"){
        project.invoice_ids=[]
      }
      project.invoices.push(newInvoice)
      project.invoice_ids.push(newInvoice._id)
      await project.save()
      console.log("newinvoicedetails", newInvoiceDetails)
      return res.json({ msg: "Added new invoice" });
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
