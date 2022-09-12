import express from "express";
const router = express.Router();

export default class InvoicesRouter {
  public controller: any;
  constructor(controller: any) {
    this.controller = controller;
  }
  routes() {
    router

      .get("/", this.controller.getAllInvoices.bind(this.controller))
      .post("/new", this.controller.createInvoice.bind(this.controller))
      .get("/barchart", this.controller.getBarChartData.bind(this.controller))
      .get(
        "/:invoice_id",
        this.controller.getSingleInvoice.bind(this.controller)
      )
      .delete("/invoice/:invoiceId", this.controller.deleteSingleInvoice.bind(this.controller))

    return router;
  }
}
