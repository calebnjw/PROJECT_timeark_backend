import { Document } from "mongoose";

export default interface IUsers extends Document {
  first_name: string;
  last_name: string;
  email: string;
  billing_details?: S; // Generic Type for nested field
  client_ids?: string[];
}

interface S extends IUsers {
  company_name: string;
  building_name: string;
  unit_number: string;
  street_name: string;
  city: string;
  country: string;
  postal_code: string;
  contact_number: string;
  company_registration: string;
}
