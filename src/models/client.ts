import mongoose, { Schema } from "mongoose";
import IClients, { IBilling } from "../interfaces/client";

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
    project_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IClients>("Client", ClientSchema);
