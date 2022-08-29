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
    console.log("REQUEST.USER", request.user);
    console.log("REQUEST.SESSION", request.session);

    if (request.user) {
      return response.status(200).json(request.user);
    } else {
      return response
        .status(401)
        .json({ success: false, message: "Session expired, please login again." });
    }
  }

  async getUser(request: Request, response: Response) {
    if (request.user) {
      const { id } = request.user;
      try {
        const user = await this.model.findOne({ id });
        response.status(200).json({ success: true, message: "User found.", user });
      } catch (error) {
        response.status(404).json({ success: false, message: "User not found." });
      }
    } else {
      return response
        .status(401)
        .json({ success: false, message: "Session expired, please login again." });
    }
  }

  updateUser(request: Request, response: Response) {
    if (request.user) {
    } else {
      return response
        .status(401)
        .json({ success: false, message: "Session expired, please login again." });
    }
  }

  async logout(request: Request, response: Response) {
    console.log(process.env.TZ);
    if (request.user) {
      try {
        console.log("LOGOUT");
        console.log("REQUEST.USER", request.user);
        console.log("REQUEST.SESSION", request.session);
        console.log("REGENERATING SESSION");
        request.session.regenerate((error) => {
          if (error) console.error("REGENERATE ERROR");
        });
        console.log("REGENERATED SESSION");
        request.logout((error) => {
          if (error) console.error("LOGOUT ERROR");
        });
        console.log("LOGGED OUT");
        request.session.destroy((error) => {
          if (error) console.error("SESSION ERROR");
        });
        console.log("DESTROYED");
        response.status(200).redirect(`${FRONTEND_URL}/login`);
      } catch (error) {
        console.error();
        response.status(500).json({ success: false });
      }
    } else {
      return response
        .status(401)
        .json({ success: false, message: "Session expired, please login again." });
    }
  }
}

export default UserController;
