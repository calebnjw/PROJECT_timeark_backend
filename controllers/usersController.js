const BaseController = require("./baseController");
const bcrypt = require("bcrypt");

class UserController extends BaseController {
  constructor(model) {
    super(model)
    // this.userMongo = userMongo
  }

  async mongoInsert(req, res){
    const newUser = await this.model.createOne({...req.body}) 
    // const userCheck = await this.userMongo.findById(newUser._id)
    return res.json({newUser})
 }
}

module.exports = UserController;