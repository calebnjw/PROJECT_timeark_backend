import mongoose, { Schema } from "mongoose";
import ITasks, { ITime } from "../interfaces/task";

const TimeSchema: Schema<ITime> = new Schema({
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

const TaskSchema: Schema<ITasks> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
    time_trackings: [
      {
        type: TimeSchema,
      },
    ],
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
