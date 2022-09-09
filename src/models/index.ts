import mongoose, { Error } from "mongoose";
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_NAME } = process.env;

const options = {
  dbName: MONGO_NAME,
};

mongoose.connect(
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@timeark.tbir99u.mongodb.net/?retryWrites=true&w=majority`,
  options
);

const db = mongoose.connection;

db.on("error", (err: Error) => {
  console.log(`connection error: ${err}`);
});

db.once("open", () => {
  console.log("mongodb connected");
});
