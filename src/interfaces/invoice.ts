import { Document, Types } from "mongoose";

export default interface IInvoices extends Document {
  project_id: Types.ObjectId;
  paid: boolean;
  overdue: boolean;
  issuedDate: Date;
  month: string;
  amount: number;
}
