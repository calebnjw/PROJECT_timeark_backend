import express from "express";

const router = express.Router();

export default class UsersRouter {
  public controller: any;
  constructor(controller: any) {
    this.controller = controller;
  }

  routes() {
    router.get("/log", this.controller.logUser.bind(this.controller));
    router.get("/logout", this.controller.logout.bind(this.controller));
    router.get("/user", this.controller.getUser.bind(this.controller));

    // router.post("/register", this.controller.createUser.bind(this.controller));
    // router.post(
    //   "/login",
    //   passport.authenticate("local"),
    //   this.controller.loginUser.bind(this.controller)
    // );

    return router;
  }
}
