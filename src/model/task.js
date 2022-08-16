import { Schema, model, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface ITimer {
  startTime: time;
  endTime: time;
}

interface ITimeByDate {
  date: Date;
  time: Types.DocumentArray<ITimer>;
}

interface ITask {
  name: String;
  time: Types.DocumentArray<ITimeByDate>;
  company: String;
  project: String;
  category: String;
}

// 2. Create a Schema corresponding to the document interface.
const taskSchema =
  new Schema() <
  ITask >
  {
    name: { type: String, required: true },
    time: { type: Array, required: true },
    company: {
      type: Schema.Types.ObjectId,
      ref: "company",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "project",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  };

class Tasks extends Base {
  constructor() {
    super(taskSchema, "Tasks");
  }
}

// 3. Create a Model.
// const Task = model < ITask > ("Task", taskSchema);

// const mongoose = require("mongoose");
// const Base = require("./baseModel.js");
// const UserSchema = new mongoose.Schema(
//   {
//     name: {
//       en: { type: String },
//       zht: { type: String },
//     },
//     password: {
//       type: String,
//       allowNull: false,
//     },
//     randomInput: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// class Tasks extends Base {
//   constructor() {
//     super(TaskSchema, "Tasks");
//   }
// }

module.exports = Tasks;
