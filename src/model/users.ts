import mongoose, { Schema } from "mongoose";
import IUsers from "../interfaces/user";

const BillingSchema: Schema = new Schema({
  company_name: {
    type: String,
  },
  address: {
    type: String,
  },
  contact_address: {
    type: String,
  },
  company_registration: {
    type: String,
  },
});

const UserSchema: Schema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      allowNull: false,
    },
    billing_details: BillingSchema,
    client_ids: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUsers>("Users", UserSchema);
