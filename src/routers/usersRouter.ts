import express from "express";
import passport from "passport";

const router = express.Router();

export default class UsersRouter {
  public controller: any;
  public passport: any;
  constructor(controller: any, passport: any) {
    this.controller = controller;
    this.passport = passport;
  }

  routes() {
    router.get("/auth/google", this.passport.authenticate("google", { scope: ["profile"] }));
    router.get(
      "/auth/redirect/google",
      this.passport.authenticate("google", { failureRedirect: "/login" }),
      (req, res) => res.redirect("/app")
    );

    router.post("/register", this.controller.createUser.bind(this.controller));
    // router.post(
    //   "/login",
    //   passport.authenticate("local"),
    //   this.controller.loginUser.bind(this.controller)
    // );

    return router;
  }
}
