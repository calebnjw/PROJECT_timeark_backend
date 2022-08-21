import { Document, Types } from "mongoose";

export default interface IClients extends Document {
  client_name: string;
  billing_details: IBilling; // interface for billing information
  project_ids: [
    {
      type: Types.ObjectId;
    }
  ];
}

export interface IBilling extends IClients {
  company_name: string;
  building_name?: string;
  unit_number?: string;
  street_name: string;
  city: string;
  country: string;
  postal_code: string;
  company_registration?: string;
}
