import mongoose from "mongoose";
import { MONGO_URI } from "../utils/config";

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.log("Mongo uri is not defined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected!");
  } catch (error) {
    console.log("Error Message: ", error.message);
    process.exit(1);
  }
};
