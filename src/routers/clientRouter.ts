import express from "express";
const router = express.Router();

export default class ClientsRouter {
  public controller: any;
  constructor(controller: any) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getClients.bind(this.controller));
    router.get(
      "/:clientId",
      this.controller.getOneClient.bind(this.controller)
    );
    router.put(
      "/:clientId/update",
      this.controller.updateClient.bind(this.controller)
    );
    router.post("/new", this.controller.createClient.bind(this.controller));

    return router;
  }
}
