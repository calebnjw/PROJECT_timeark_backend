import mongoose from "mongoose";
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_NAME } = process.env;

const options = {
  dbName: MONGO_NAME,
};
mongoose.connect(
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@timeark.tbir99u.mongodb.net/?retryWrites=true&w=majority`,
  options
);

// console.log(
//   `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@timeark.tbir99u.mongodb.net/?retryWrites=true&w=majority`
// );

const db = mongoose.connection;

db.on("error", (err: string) => {
  console.log(`connection error: ${err}`);
});

db.once("open", () => {
  console.log("mongodb connected");
});
