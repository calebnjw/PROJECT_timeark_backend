import mongoose, { Schema } from "mongoose";
import IUsers from "../interfaces/user";

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUsers>("Users", UserSchema);
