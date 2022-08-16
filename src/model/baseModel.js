const mongoose = require("mongoose");

class Base {
  constructor(schema, name) {
    this.model = mongoose.model(name, schema);
  }

  createOne(query) {
    return this.model.create(query);
  }

  findById(id){
    return this.model.findById(id)
  }
}

module.exports = Base;