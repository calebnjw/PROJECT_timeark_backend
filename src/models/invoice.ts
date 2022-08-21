import mongoose, { Schema } from "mongoose";
import IInvoices from "../interfaces/invoice";

const InvoiceSchema: Schema = new Schema(
  {
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
