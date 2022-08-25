import { Document } from "mongoose";

export default interface IUsers extends Document {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  billing_details?: IBilling;
  client_ids?: string[];
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
