import express from "express";
import passport from "passport";

const FRONTEND_URL = process.env.FRONTEND_URL;

const router = express.Router();

export default class AuthRouter {
  routes() {
    router.get(
      "/google",
      passport.authenticate("google", {
        scope: ["email", "profile"],
      })
    );

    router.get(
      "/google/callback",
      passport.authenticate("google", {
        successRedirect: `${FRONTEND_URL}/projects`,
        failureRedirect: `${FRONTEND_URL}/login`,
      })
    );

    return router;
  }
}
