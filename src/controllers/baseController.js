const res = require("express/lib/response")

class BaseController {
    constructor(model){
        this.model = model
    }
}

module.exports = BaseController