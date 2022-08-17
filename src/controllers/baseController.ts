import { Response } from "express";
import mongoose = require("mongoose");
import { env } from "../environment/env";
import { IModel } from "../interfaces/IModel";
import { IPopulate } from "../interfaces/IPopulate";
import { BaseModel } from "../models/base.model";
