import mongoose, { Schema } from "mongoose";
import IInvoices from "../interfaces/invoice";

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
    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInvoices>("Invoice", InvoiceSchema);
