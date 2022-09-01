import { Request, Response } from "express";
import passport from "passport";
import { Profile, VerifyCallback } from "passport-google-oauth20";

import UserModel from "../models/users";

const PORT: number = process.env.PORT;
const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET;

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    // Google app credentials
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${PORT}/auth/google/callback`,
    },
    // function that receives profile information from Google
    // and passes user object to serializeUser
    async (
      request: Request,
      accessToken: string,
      refreshToken: string | undefined,
      profile: Profile,
      done: VerifyCallback
    ) => {
      const { emails } = profile; // get emails from google profile
      let user: any; // declare variable to store emails

      // if user profile has emails
      if (emails && emails.length > 0) {
        user = await UserModel.findOne({ "emails.value": emails[0].value }); // lookup database for account with same email
      }

      // if user returns null,
      // create new entry in database
      if (!user) {
        user = await UserModel.create({
          provider: profile.provider,
          externalId: profile.id,
          displayName: profile.displayName,
          name: profile.name,
          emails: profile.emails,
          photos: profile.photos,
        });
        user.newUser = true; // TODO: if new user is true, login page should redirect to profile creation page
      } else {
        user.newUser = false;
      }

      return done(null, user);
    }
  )
);

// takes id, displayName and newUser state from previous return
// and passes it to deserializeUser.
passport.serializeUser((user: Express.User, done: VerifyCallback) => {
  const { id, displayName, newUser } = user;
  return done(null, { id, displayName, newUser });
});

// saves information from previous return into request.session.passport.user.
passport.deserializeUser((user: Express.User, done: VerifyCallback) => {
  return done(null, user);
});
