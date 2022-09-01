import mongoose, { Schema } from "mongoose";
import ITasks from "../interfaces/task";

const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
    },
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITasks>("Task", TaskSchema);
