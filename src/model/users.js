const mongoose = require("mongoose");
const Base = require("./baseModel.js");
const UserSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String },
      zht: { type: String },
    },
    password: {
      type: String,
      allowNull: false,
    },
    randomInput: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

class Users extends Base {
  constructor() {
    super(UserSchema, "Users");
  }
}

module.exports = Users;
