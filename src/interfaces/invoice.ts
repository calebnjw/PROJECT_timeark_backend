import { Document } from "mongoose";

export default interface IInvoices extends Document {
  paid: boolean;
  overdue: boolean;
}
