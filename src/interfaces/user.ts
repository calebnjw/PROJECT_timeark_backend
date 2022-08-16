import { Document } from "mongoose";

export default interface IUsers extends Document {
  name: string;
  email: string;
  password: string;
}
