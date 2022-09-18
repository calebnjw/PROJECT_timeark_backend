import express from "express";
const router = express.Router();

export default class ClientsRouter {
  public controller: any;
  constructor(controller: any) {
    this.controller = controller;
  }

  routes() {
    router
      .get("/", this.controller.getClients.bind(this.controller))
      .get("/:clientId", this.controller.getOneClient.bind(this.controller))
      .put(
        "/:clientId/update",
        this.controller.updateClient.bind(this.controller)
      )
      .post("/new", this.controller.createClient.bind(this.controller))
      .delete("/:clientId", this.controller.deleteClient.bind(this.controller));

    return router;
  }
}
