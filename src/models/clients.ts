import mongoose, { Schema } from "mongoose";
import { IBilling, IClients } from "../interfaces/clients";

const BillingSchema: Schema<IBilling> = new Schema({
  company_name: {
    type: String,
    required: true,
  },
  building_name: {
    type: String,
  },
  unit_number: {
    type: String,
  },
  street_name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },
  company_registration: {
    type: String,
  },
});

const ClientSchema: Schema<IClients> = new Schema(
  {
    client_name: {
      type: String,
      required: true,
    },
    billing_details: {
      type: BillingSchema,
      required: true,
    },
    project_ids: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IClients>("Clients", ClientSchema);
