import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import IUsers from "../interfaces/user";

const BillingSchema: Schema = new Schema({
  company_name: String,
  building_name: String,
  unit_number: String,
  street_name: String,
  city: String,
  country: String,
  postal_code: String,
  contact_number: String,
  company_registration: String,
});

const NameSchema: Schema = new Schema({
  familyName: String,
  givenName: String,
  middleName: String,
});

const EmailSchema: Schema = new Schema({
  value: String,
  type: String,
});

const UserSchema: Schema = new Schema(
  {
    provider: String,
    id: String,
    username: String,
    password: String,
    displayName: String,
    name: NameSchema,
    emails: [EmailSchema],
    billingDetails: BillingSchema,
    clientIds: Array,
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model<IUsers>("Users", UserSchema);
