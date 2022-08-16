import mongoose, { Schema } from "mongoose";
import ITasks from "../interfaces/task";

const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    time: {
      type: [],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITasks>("Tasks", TaskSchema);
