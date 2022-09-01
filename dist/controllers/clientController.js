"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BSON_1 = __importDefault(require("BSON"));
class ClientController {
    constructor(model) {
        this.model = model;
    }
    getClients(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.model.find({});
                return response.status(200).json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getOneClient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clientId } = request.params;
            try {
                // create new BSON.ObjectId to search MongoDB
                const data = yield this.model.find({ _id: new BSON_1.default.ObjectId(clientId) });
                return response.status(200).json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    createClient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientDetails = request.body;
            try {
                const data = yield this.model.create(clientDetails);
                return response.status(201).json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateClient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clientId } = request.params;
            const clientDetails = request.body;
            try {
                const data = yield this.model.replaceOne({ _id: new BSON_1.default.ObjectId(clientId) }, clientDetails);
                return response.status(201).json(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = ClientController;
