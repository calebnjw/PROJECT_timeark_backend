import { Document, Types } from "mongoose";

export default interface ITasks extends Document {
  name: "";
  time: [];
  // project: IProject;
  // category: ICategory;
  // client: IClient;
}
