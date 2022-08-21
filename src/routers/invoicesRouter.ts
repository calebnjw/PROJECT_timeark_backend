import express from "express";
const router = express.Router();

export default class InvoicesRouter {
  public controller: any;
  constructor(controller: any) {
    this.controller = controller;
  }
  routes() {
    router
    .get("/", this.controller.getAllProjects.bind(this.controller))
    .get("/invoice", this.controller.getAllInvoices.bind(this.controller))
    .get("/:id", this.controller.getSingleInvoice.bind(this.controller))

    return router;
  }
}