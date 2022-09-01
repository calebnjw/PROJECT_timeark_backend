import express from "express";
const router = express.Router();

export default class ProjectsRouter {
  public controller: any;
  constructor(controller: any) {
    this.controller = controller;
  }

  routes() {
    router
      .get("/", this.controller.getAllProjects.bind(this.controller))
      .get("/all", this.controller.AllProjects.bind(this.controller))
      .post("/new", this.controller.createProject.bind(this.controller))
      .get("/:id", this.controller.getSingleProject.bind(this.controller))
      .put("/:id/update", this.controller.updateProject.bind(this.controller));
    // .delete("/:id", this.controller.deleteProject.bind(this.controller));

    return router;
  }
}
