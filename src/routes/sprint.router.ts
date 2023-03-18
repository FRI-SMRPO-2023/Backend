import express from "express";
import SprintController from "../controller/sprint.controller";

const sprintRouter = express.Router();

sprintRouter.route("/")
    .get(SprintController.getAll)
    .post(SprintController.createSprint)

sprintRouter.route("/current")
    .get(SprintController.getCurrent)

export default sprintRouter;