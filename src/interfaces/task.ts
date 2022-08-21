import { Document, Types } from "mongoose";

export interface IDuration extends Document {
  start_time: Date;
  end_time: Date;
}

export default interface ITasks extends Document {
  name: string;
  category: string;
  duration: IDuration[];
  project_id: Types.ObjectId;
}
