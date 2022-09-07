import { Document, Types } from "mongoose";

export interface ITime extends Document {
  startDate: Date;
  endDate: Date;
}

export default interface ITasks extends Document {
  name: string;
  category: string;
  isDone: boolean;
  time_trackings: ITime[];
  project_id: Types.ObjectId;
}
