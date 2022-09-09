import express from "express";
import passport from "passport";

const FRONTEND_URL = process.env.FRONTEND_URL;

const router = express.Router();

export default class AuthRouter {
  routes() {
    // route to send to google login.
    router.get(
      "/google",
      passport.authenticate("google", {
        scope: ["email", "profile"],
      })
    );

    // route google login redirects to.
    router.get(
      "/google/callback",
      passport.authenticate("google", {
        // TODO: success should redirect to temporary route that checks whether new user, then that page will redirect to homepage or continue onboarding if new user.
        successRedirect: `${FRONTEND_URL}/dashboard`,
        failureRedirect: `${FRONTEND_URL}/login`,
      })
    );

    return router;
  }
}
