import express from "express";
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
      "/auth/google/callback",
      this.passport.authenticate("google", { failureRedirect: "/login" }),
      (req, res) => res.redirect("/app")
    );

    // router.post("/mongo", this.controller.createUser.bind(this.controller));

    return router;
  }
}
