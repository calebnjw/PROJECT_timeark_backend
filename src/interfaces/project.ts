import { Document, Types } from "mongoose";

export default interface IProjects extends Document {
  name: string;
  budget: number;
  rate: number;
  due_date: Date;
  category_name: [];
  task_ids: [
    {
      type: Types.ObjectId;
    }
  ];
  invoice_ids: [
    {
      type: Types.ObjectId;
    }
  ];
  client_id: Types.ObjectId;
}
