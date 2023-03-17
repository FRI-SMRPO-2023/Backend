import express from "express";
import TaskController from "../controller/task.controller";
import { validateTaskUpdate } from "../services/validator.service";
const taskRouter = express.Router();

//TODO
taskRouter.route("/:id")
    .patch(TaskController.updateTask)
    .delete(validateTaskUpdate, TaskController.deleteTask);

export default taskRouter
