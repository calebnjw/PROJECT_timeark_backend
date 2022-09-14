import mongoose, { Schema } from "mongoose";
import IInvoices, { TaskTime } from "../interfaces/invoice";

const TimeSchema: Schema<TaskTime> = new Schema({
  taskName: {
    type: String,
  },
  timeSpent: {
    type: Number,
  },
});

const InvoiceSchema: Schema = new Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    paid: {
      type: Boolean,
      required: true,
    },
    issuedDate: {
      type: Date,
      required: true,
    },
    overdue: {
      type: Boolean,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    time_trackings: [
      {
        type: TimeSchema,
      },
    ],
    amount: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInvoices>("Invoice", InvoiceSchema);
