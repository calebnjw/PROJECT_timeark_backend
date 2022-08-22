import mongoose, { Schema } from "mongoose";
import IProjects from "../interfaces/project";

const ProjectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    category_name: {
      type: Array,
    },
    task_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    invoice_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Invoice",
      }
    ],
    client_id: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProjects>("Project", ProjectSchema);
