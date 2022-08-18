import express from "express";
const router = express.Router();

export default class UsersRouter {
  public controller: any;
  constructor(controller: any) {
    this.controller = controller;
  }

  routes() {
    // router.post("/mongo", this.controller.createUser.bind(this.controller));

    return router;
  }
}
