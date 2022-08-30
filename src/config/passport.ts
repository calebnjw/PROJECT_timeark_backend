import { Request, Response } from "express";
import passport from "passport";
import { Profile, VerifyCallback } from "passport-google-oauth20";
import IUsers from "../interfaces/user";

import UserModel from "../models/users";

const PORT: number = process.env.PORT;
const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET;

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${PORT}/auth/google/callback`,
    },
    async (
      request: Request,
      accessToken: string,
      refreshToken: string | undefined,
      profile: Profile,
      done: VerifyCallback
    ) => {
      const { emails } = profile;

      let user: any;
      // if user profile has emails
      console.log("USER: (1)", user);
      console.log("EMAILS:", emails);
      console.log("PROFILE", profile);
      if (emails && emails.length > 0) {
        user = await UserModel.findOne({ "emails.value": emails[0].value });
        console.log("USER: (2)", user);
      }

      // if user is null, create new entry
      if (!user) {
        user = await UserModel.create({
          provider: profile.provider,
          externalId: profile.id,
          displayName: profile.displayName,
          name: profile.name,
          emails: profile.emails,
          photos: profile.photos,
        });
        user.newUser = true; // set newUser to true
      } else {
        user.newUser = false; // set newUser to false by default
      }
      console.log("USER: (3)", user);

      return done(null, user);
    }
  )
);

// saves user id in request.session.passport.user.
passport.serializeUser((user: Express.User, done: VerifyCallback) => {
  console.log("COVERING USER IN CEREAL");
  const { id, displayName, newUser } = user;
  return done(null, { id, displayName, newUser });
});

// then takes request.session.passport.user.id
passport.deserializeUser((user: Express.User, done: VerifyCallback) => {
  console.log("REMOVING CEREAL FROM USER");
  return done(null, user);
});
