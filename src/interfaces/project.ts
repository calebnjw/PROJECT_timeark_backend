import { Document, Types } from "mongoose";

export default interface IProjects extends Document {
  name: "";
  budget: number;
  rate: number;
  due_date: Date;
  category_name: [];
  tasks: [];
  invoices: [];
  client: Types.ObjectId;
}
