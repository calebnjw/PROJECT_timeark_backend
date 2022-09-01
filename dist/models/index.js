"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_NAME } = process.env;
const options = {
    dbName: MONGO_NAME,
};
mongoose_1.default.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@timeark.tbir99u.mongodb.net/?retryWrites=true&w=majority`, options);
const db = mongoose_1.default.connection;
db.on("error", (err) => {
    console.log(`connection error: ${err}`);
});
db.once("open", () => {
    console.log("mongodb connected");
});
