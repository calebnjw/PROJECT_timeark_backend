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

  // FUNCTION FOR TESTING: logs user and session
  async logUser(request: Request, response: Response) {
    console.log("REQUEST.USER", request.user);
    console.log("REQUEST.SESSION", request.session);

    if (request.user) {
      return response.status(200).redirect(`${FRONTEND_URL}/login`);
    } else {
      return response.status(401).redirect(`${FRONTEND_URL}/login`);
    }
  }

  async getUser(request: Request, response: Response) {
    if (request.user) {
      const { id } = request.user;

      try {
        const user = await this.model.findOne({ _id: id });
        console.log(user);

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

  async updateUser(request: Request, response: Response) {
    const { updatedProfile } = request.body;
    console.log("REQUEST.BODY", updatedProfile);

    if (request.user) {
      try {
        console.log("SAVING!");
        const updated = await this.model.updateOne(
          {
            _id: request.user.id,
          },
          updatedProfile
        );
        console.log("SAVED!");
        console.log("UPDATED", updated);
        response.status(200).json({ success: true });
      } catch (error) {
        console.error();
        response.status(500).json({ success: false, message: error });
      }
    } else {
      return response
        .status(401)
        .json({ success: false, message: "Session expired, please login again." });
    }
  }

  async logoutUser(request: Request, response: Response) {
    // if user session exists
    if (request.user) {
      try {
        // regenerate a new session
        request.session.regenerate((error) => {
          if (error) console.error("REGENERATE ERROR");
        });
        // removes request.user
        request.logout((error) => {
          if (error) console.error("LOGOUT ERROR");
        });
        // and destroy current session
        request.session.destroy((error) => {
          if (error) console.error("SESSION ERROR");
          response.status(200).redirect(`${FRONTEND_URL}/login`);
        });
      } catch (error: any) {
        console.error();
        response.status(500).json({ success: false, message: error });
      }
    } else {
      return response
        .status(401)
        .json({ success: false, message: "Session expired, please login again." });
    }
  }

  async deleteUser(request: Request, response: Response) {
    if (request.user) {
      console.log(request.user);
      try {
        // delete user data
        // TODO: Cannot just delete account, must delete all other content associated with the same ID.
        const deleted = await this.model.deleteOne({ _id: request.user.id });
        console.log("DELETED", deleted);
        // then do a logout
        request.session.regenerate((error) => {
          if (error) console.error("REGENERATE ERROR");
        });
        request.logout((error) => {
          if (error) console.error("LOGOUT ERROR");
        });
        request.session.destroy((error) => {
          if (error) console.error("SESSION ERROR");
        });

        return response.status(200).json({ success: deleted.acknowledged });
      } catch (error: any) {
        console.error();
        response.status(500).json({ success: false, message: error });
      }
    } else {
      return response
        .status(401)
        .json({ success: false, message: "Session expired, please login again." });
    }
  }
}

export default UserController;
