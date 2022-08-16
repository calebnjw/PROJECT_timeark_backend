import { Document, Types } from "mongoose";

export default interface ITasks extends Document {
  name: "";
  time: [];
  project: Types.ObjectId;
  category: Types.ObjectId;
  client: Types.ObjectId;
}
