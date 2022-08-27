import express from "express";
import passport from "passport";

const FRONTEND_URL = process.env.FRONTEND_URL;

const router = express.Router();

export default class AuthRouter {
  public controller: any;
  constructor(controller: any) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/google",
      passport.authenticate("google", {
        scope: ["email", "profile", "openid"],
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
