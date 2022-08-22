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
    overdue: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInvoices>("Invoice", InvoiceSchema);
