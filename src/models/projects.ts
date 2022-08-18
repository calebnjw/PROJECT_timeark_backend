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
      type: [],
    },
    tasks: {
      type: [],
    },
    invoices: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProjects>("Tasks", ProjectSchema);
