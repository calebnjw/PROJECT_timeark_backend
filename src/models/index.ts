import mongoose, { Error } from "mongoose";
const { MONGO_NAME, MONGO_URI } = process.env;

const options = {
  dbName: MONGO_NAME,
};

mongoose.connect(MONGO_URI, options);

const db = mongoose.connection;

db.on("error", (err: Error) => {
  console.log(`connection error: ${err}`);
});

db.once("open", () => {
  console.log("mongodb connected");
});
