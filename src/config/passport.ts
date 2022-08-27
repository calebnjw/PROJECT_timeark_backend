import { Request } from "express";
import passport from "passport";
import { Profile, VerifyCallback } from "passport-google-oauth20";

import UserModel from "../models/users";

const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET;

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `/auth/google/callback`,
    },
    async (
      request: Request,
      response: Response,
      accessToken: string,
      refreshToken: string | undefined,
      profile: Profile,
      done: VerifyCallback
    ) => {
      const { emails } = profile;
      let user: any;

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
passport.serializeUser((user: Express.User, done: VerifyCallback) => {
  console.log("COVERING USER IN CEREAL");
  const { id, displayName } = user;
  const data = {
    id,
    displayName,
  };
  return done(null, data);
});

// then takes request.session.passport.user.id
passport.deserializeUser((data: Express.User, done: VerifyCallback) => {
  console.log("REMOVING CEREAL FROM USER");
  return done(null, data);
});
