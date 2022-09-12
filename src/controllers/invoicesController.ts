import { Request, Response } from "express";
import { Model } from "mongoose";
import IInvoices from "../interfaces/invoice";
import Project from "../models/project";
import Client from "../models/client";
import Invoice from "../models/invoice";
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
      return res.json({ msg: "requested!", invoices });
    } catch (err) {
      console.log("Error message: ", err);
    }
  }

  async createInvoice(req: Request, res: Response) {
    try {
      const { project_id, selectedMonth } = req.body;

      const selectedProject: any = await Project.findById(project_id).populate(
        "invoice_ids"
      );

      const issuedInvoices = selectedProject.invoice_ids;

      const existingInvoice = issuedInvoices.find(
        (i: any) => i.month === selectedMonth
      );
      if (existingInvoice) {
        return res.json({
          msg: "Invoice already issued for the month selected",
        });
      } else {
        const newInvoice = {
          project_id: project_id,
          paid: false,
          issuedDate: new Date(),
          overdue: false,
          month: selectedMonth,
        };
        const newInvoiceDetails = await this.model.create(newInvoice);
        selectedProject?.invoice_ids.push(newInvoiceDetails._id);
        await selectedProject?.save();
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

  async getBarChartData(req: Request, res: Response) {
    const { id } = req.user; // Please use req.user.id here!
    try {
      const getUserClients = await Client.find({ user_id: id });
      const clientList = getUserClients.map((c) => c._id);

      // Get projects by Client ID
      let projects = [];
      for (let i = 0; i < clientList.length; i++) {
        let project = await Project.find({ client_id: clientList[i] });
        projects.push(project);
      }

      const projectflat = projects.flat();
      const barchartData = [["Project Name", "Amt Earned", "Total Budget"]];
      // for each project, get the invoice ids and retrieve the invoice information
      for (let i = 0; i < projectflat.length; i++) {
        const result = projectflat[i].invoice_ids;
        // variable to keep track of earnings per project
        let projectAmtEarned: number = Number(0);

        if (result.length > 0) {
          for (let j = 0; j < result.length; j++) {
            let foundinvoice = await Invoice.findById(result[j]);
            // console.log(foundinvoice);
            if (foundinvoice) {
              // add the amount earned in invoice to variable
              projectAmtEarned += Number(foundinvoice.amount);
            }
          }
        }

        // i don't know how to resolve this
        barchartData.push([
          projectflat[i].name,
          // projectAmtEarned,
          // projectflat[i].budget,
        ]);
      }
      res.json(barchartData);
    } catch (err) {
      console.log(err);
    }
  }
}
export default InvoiceController;
