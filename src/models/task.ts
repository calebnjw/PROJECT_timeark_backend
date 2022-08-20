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
    duration: {
      type: Array,
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
