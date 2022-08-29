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
      let user: any;
      const { emails } = profile;

      if (emails) {
        user = await UserModel.findOne({ "emails.value": emails[0].value });
      }

      if (!user) {
        user = await UserModel.create({
          provider: profile.provider,
          externalId: profile.id,
          displayName: profile.displayName,
          name: profile.name,
          emails: profile.emails,
          photos: profile.photos,
        });
      }

      return done(null, user);
    }
  )
);

// saves user id in request.session.passport.user.
passport.serializeUser((user: any, done: VerifyCallback) => {
  console.log("COVERING USER IN CEREAL");
  const { id, displayName } = user;
  return done(null, { id, displayName });
});

// then takes request.session.passport.user.id
passport.deserializeUser((user: any, done: VerifyCallback) => {
  console.log("REMOVING CEREAL FROM USER");
  return done(null, user);
});
