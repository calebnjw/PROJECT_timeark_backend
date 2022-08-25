import bcrypt from "bcrypt";

import { Request, Response } from "express";
import { Model } from "mongoose";
import passport from "passport";

import IUsers from "../interfaces/user";
import UserModel from "../models/users";

const SALT = Number(process.env.SALT_ROUNDS);

class UserController {
  public model: Model<IUsers>;
  constructor(model: Model<IUsers>) {
    this.model = model;
  }

  async createUser(request: Request, response: Response) {
    const { username, password, first_name, last_name, email } = request?.body; // question mark in the event of empty body

    // if empty username / password fields
    if (!username || !password) {
      return response.json({ success: false, message: "Invalid username or password." });
    }

    // verify that there are no exising users
    UserModel.findOne({ username }, async (error: Error, document: IUsers) => {
      if (error) throw error;
      if (document) {
        return response.json({ success: false, message: "Existing user. Please sign in." });
      } else {
        const hashedPassword: string = await bcrypt.hash(password, SALT);
        const newUser = new UserModel({
          username,
          password: hashedPassword,
          first_name,
          last_name,
          email,
        });

        await newUser.save();
        return response.json({ success: true, user: newUser });
      }
    });
  }
}

export default UserController;
