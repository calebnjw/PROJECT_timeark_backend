import { Document, Types } from "mongoose";

export interface ITime extends Document {
  date: Date;
  hours: number;
}

export default interface ITasks extends Document {
  name: string;
  category: string;
  isDone: boolean;
  time_tracking: ITime[];
  project_id: Types.ObjectId;
}
