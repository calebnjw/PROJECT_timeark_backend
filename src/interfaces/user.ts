import { Document } from "mongoose";

export default interface IUsers extends Document {
  first_name: string;
  last_name: string;
  email: string;
  billing_details: S; // Generic Type for nested field
}

interface S extends IUsers {
  company_name: string;
  address: string;
  contact_number: string;
  company_registration: string;
}
