<<<<<<< HEAD
import { Document } from 'mongoose';

export default interface IProjects extends Document {
    //items in project table
}

interface S extends IProjects {
    issue_date: Date;
    paid: boolean;
    overdue: boolean;
}
=======
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
>>>>>>> 667e231258fb52610a70c444e25cee7ec94d69ba
