import bcrypt from "bcrypt";

import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

import IUsers from "../interfaces/user";
import UserModel from "../models/users";

const SALT = Number(process.env.SALT_ROUNDS);
const FRONTEND_URL = process.env.FRONTEND_URL;

class UserController {
  public model: Model<IUsers>;
  constructor(model: Model<IUsers>) {
    this.model = model;
  }

  async logUser(request: Request, response: Response) {
    if (request.user) {
      console.log("REQUEST.USER", request.user);
    }
    return response.send(request.user);
  }

  async logout(request: Request, response: Response, next: NextFunction) {
    if (request.user) {
      request.logout((error) => {
        if (error) {
          console.log("LOGOUT ERROR", error);
          return next(error);
        }
      });
      request.session.destroy((error) => {
        if (error) {
          console.log("SESSION ERROR", error);
          return next(error);
        }
        response.redirect(`${FRONTEND_URL}/login`);
      });
    } else {
      response.json({ message: "NO REQUEST.USER" });
    }
  }
}

export default UserController;
