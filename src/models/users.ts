import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import IUsers from "../interfaces/user";

const BillingSchema: Schema = new Schema({
  company_name: {
    type: String,
  },
  building_name: {
    type: String,
  },
  unit_number: {
    type: String,
  },
  street_name: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  contact_number: {
    type: String,
  },
  company_registration: {
    type: String,
  },
});

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      allowNull: false,
      unique: true,
    },
    password: {
      type: String,
      allowNull: false,
      required: true,
    },
    first_name: {
      type: String,
      allowNull: false,
      required: true,
    },
    last_name: {
      type: String,
      allowNull: false,
      required: true,
    },
    email: {
      type: String,
      allowNull: false,
      required: true,
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

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model<IUsers>("Users", UserSchema);
