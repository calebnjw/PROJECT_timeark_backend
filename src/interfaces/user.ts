import { ObjectId, Document } from "mongoose";

export default interface IUsers extends Document {
  _id: ObjectId;
  provider: string;
  externalId: string;
  displayName: string;
  name: IName;
  emails: IEmail[];
  photos?: IPhoto[];
  billingDetails?: IBilling;
  clientIds?: string[];
}

export interface IName extends IUsers {
  familyName: string;
  givenName: string;
  middleName?: string;
}

export interface IEmail extends IUsers {
  value: string;
  type?: string;
}

export interface IPhoto extends IUsers {
  value: string;
}

export interface IBilling extends IUsers {
  company_name: string;
  building_name?: string;
  unit_number?: string;
  street_name: string;
  city: string;
  country: string;
  postal_code: string;
  contact_number: string;
  company_registration?: string;
}
