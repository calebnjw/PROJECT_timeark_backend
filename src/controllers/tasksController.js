const BaseController = require("./baseController");

class TaskController extends BaseController {
  constructor(model) {
    super(model);
    // this.userMongo = userMongo
  }

  async timeInsert(req, res) {
    const newTask = await this.model.createOne({ ...req.body });
    // const userCheck = await this.userMongo.findById(newUser._id)
    return res.json({ newUser });
  }
}

module.exports = TaskController;
