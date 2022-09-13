import bcrypt from "bcrypt";

import { Request, Response } from "express";
import { Model } from "mongoose";

import IUsers from "../interfaces/user";

const EXPIRED_MESSAGE = "Session expired, please login again.";
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
    return response.redirect(`${FRONTEND_URL}/login`);
  }

  async getUser(request: Request, response: Response) {
    if (request.user) {
      const { id, newUser } = request.user;

      try {
        const user = await this.model.findOne({ _id: id });
        return response.status(200).json({ success: true, user, newUser });
      } catch (error) {
        return response.status(404).json({ success: false });
      }
    } else {
      return response.status(401).json({ success: false, message: EXPIRED_MESSAGE });
    }
  }

  async updateUser(request: Request, response: Response) {
    const { updatedProfile } = request.body;
    if (request.user) {
      try {
        console.log("SAVING!");
        const updated = await this.model.updateOne(
          {
            _id: request.user.id,
          },
          updatedProfile,
          {
            runValidators: true,
          }
        );
        console.log("UPDATED", updated);

        if (request.user.newUser) {
          request.user.newUser = false;
        }
        return response.status(200).json({ success: updated.acknowledged });
      } catch (error) {
        console.error();
        return response.status(500).json({ success: false, message: error });
      }
    } else {
      return response.status(401).json({ success: false, message: EXPIRED_MESSAGE });
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
        });
        return response.status(200).redirect(`${FRONTEND_URL}/login`);
      } catch (error: any) {
        console.error();
        return response.status(500).json({ success: false, message: error });
      }
    } else {
      return response.status(401).json({ success: false, message: EXPIRED_MESSAGE });
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
        return response.status(500).json({ success: false, message: error });
      }
    } else {
      return response.status(401).json({ success: false, message: EXPIRED_MESSAGE });
    }
  }
}

export default UserController;
