import express from "express";
import TaskController from "../controller/task.controller";
import TimeLogController from "../controller/timelog.controller";
import { validateTaskUpdate } from "../services/validator.service";
const taskRouter = express.Router();


const timelogRouter = express.Router();

timelogRouter.route("/")
    .post(TimeLogController.createTimeLogs)

export default timelogRouter;
