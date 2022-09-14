import { Document, Types } from "mongoose";

export interface TaskTime extends Document {
  taskName: String;
  timeSpent: Number;
}

export default interface IInvoices extends Document {
  project_id: Types.ObjectId;
  paid: boolean;
  overdue: boolean;
  issuedDate: Date;
  month: string;
  amount: Number;
  time_trackings: TaskTime[];
}
