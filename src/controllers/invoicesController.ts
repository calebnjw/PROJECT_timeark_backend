import { Request, Response } from "express";
import { AnyExpression, Model } from "mongoose";
import IInvoices from "../interfaces/invoice";
import Project from "../models/project";
import Client from "../models/client";
import Invoice from "../models/invoice";
import timeConversion from "../scripts/timeConversion";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import Task from "../models/task";
import ITasks from "../interfaces/task";

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
      console.log("reqbody", req.body);

      const selectedProject: any = await Project.findById(project_id).populate(
        "invoice_ids"
      );
      console.log("selected project: ", selectedProject);
      // Find the project with project id
      // Loop through the tasks arr by tasks id
      const taskIds = selectedProject.task_ids;
      console.log("task ids: ", taskIds);
      const tasksArr: any = [];
      for (let i = 0; i < taskIds.length; i += 1) {
        const task: any = await Task.findById(taskIds[i]);
        console.log("task: ", task);
        tasksArr.push(task);
      }
      console.log("tasks arr: ", tasksArr);
      const getFirstDayOfMonth = (year: any, month: any) => {
        return new Date(year, month, 1);
      };
      const monthObj:any = {
        "January": "01",
        "Febuary": "02",
        "March": "03",
        "April": "04",
        "May": "05",
        "June": "06",
        "July": "07",
        "August": "08",
        "September": "09",
        "October": "10",
        "November": "11",
        "December": "12",
      };
      const year = new Date().getFullYear();
      
      const firstDayOfSelectedMonth = new Date(year, monthObj[selectedMonth]-1, 1);
      const lastDayOfSelectedMonth = new Date(year, monthObj[selectedMonth], 0);
      const timeTaskArr = tasksArr.map((t: any) => {
        const filteredTime = t.time_trackings.filter(
          (tt: any) => 
          (new Date(tt.startDate) > new Date(firstDayOfSelectedMonth)) && (new Date(tt.endDate) < new Date(lastDayOfSelectedMonth) )
        )
        t.time_trackings = filteredTime;
        return t;
        
      });

      console.log("time trackings", timeTaskArr)
      const sortedTimeTaskArr = timeTaskArr.flat();

      const timeArr: any = sortedTimeTaskArr.map((timeTask:any) => {
        console.log(timeTask.time_trackings)
        const timeArr = timeTask.time_trackings.map((tt:any) => {
          const st = new Date(tt.startDate).getTime();
          const dt = new Date(tt.endDate).getTime();
          const timeDiff = dt - st;
          const getHours = timeDiff /(1000 * 60 * 60)
          return getHours;
        });
        const sumOfTime = timeArr.reduce((a:any, b:any) => a+b);
          return {"taskName": timeTask.name, "timeSpent":sumOfTime}
      })

      console.log(" time arr: ", timeArr)
      const totalTimeSpent = timeArr.reduce((a:any, b:any) => a.timeSpent + b.timeSpent);
      console.log("totalTimeSpent", totalTimeSpent)
      const totalAmount = selectedProject.rate * totalTimeSpent;
      console.log("totalAmount: ",totalAmount)
      
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
          amount: totalAmount,
          time_trackings: timeArr,
        };
        const newInvoiceDetails = await this.model.create(newInvoice);
        selectedProject?.invoice_ids.push(newInvoiceDetails._id);
        await selectedProject?.save(); 
        
      return res.json({ msg: "Added new invoice", newInvoiceDetails });
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

  async deleteSingleInvoice(req: Request, res: Response) {
    try {
      const invoice = await this.model.findByIdAndDelete(req.params.invoiceId);
      console.log("paramsid", req.params.invoiceId);
      return res.json({ invoice });
    } catch (err) {
      console.log(err);
    }
  }

  async getBarChartData(req: Request, res: Response) {
    const { user_id } = req.query; // Please use req.user.id here!
    try {
      const getUserClients = await Client.find({ user_id: user_id });
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
