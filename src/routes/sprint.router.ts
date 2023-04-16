import express from "express";
import SprintController from "../controller/sprint.controller";
import { validateSprintUpdate } from "../services/validator.service";

const sprintRouter = express.Router();

//its all inside project.router.ts
// sprintRouter.route("/")
//     .get(SprintController.getAll)
//     .post(SprintController.createSprint)


// sprintRouter.route("/current")
//     .get(SprintController.getCurrent)
//
sprintRouter.route("/:id")
      .post(validateSprintUpdate, SprintController.updateSprint);

export default sprintRouter;
