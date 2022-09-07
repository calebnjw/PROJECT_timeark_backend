import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import IUsers from "../interfaces/user";

const BillingSchema: Schema = new Schema({
  companyName: String,
  buildingName: String,
  unitNumber: String,
  streetName: String,
  city: String,
  country: String,
  postalCode: String,
  contactNumber: String,
  companyRegistration: String,
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

const PhotoSchema: Schema = new Schema({
  value: String,
  type: String,
});

const UserSchema: Schema = new Schema(
  {
    provider: String,
    externalId: String,
    displayName: String,
    name: NameSchema,
    emails: [EmailSchema],
    photos: [PhotoSchema],
    billingDetails: BillingSchema,
    client_id: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model<IUsers>("Users", UserSchema);
