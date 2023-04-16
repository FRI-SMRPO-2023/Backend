import { RequestHandler } from "express";
import { general_error_handler } from "../utils/error_handling";
import SprintService from "../services/sprint.service";

const getCurrent: RequestHandler = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const currSprint = await SprintService.getCurrentSprint(projectId);
    res.status(200).json(currSprint);
  } catch (err) {
    general_error_handler(req, res, next);
  }
};

const createSprint: RequestHandler = async (req, res, next) => {
  try {
    console.log("Creating new sprint");
    const projectId = parseInt(req.params.projectId);
    console.log("THis is project ID:", projectId);
    const allSprints = await SprintService.getAllSprints(projectId);
    console.log("These are all sprints", allSprints);
    const newDates = {
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
    };
    if (!SprintService.dateInOrder(newDates)) {
      return res.status(409).json({
        status: "failed",
        error: {
          message: "endDate should be later than startDate",
        },
      });
    }
    for (let sprint of allSprints) {
      console.log("chekcing colliding");
      const collides = await SprintService.collidingDates(sprint, newDates);
      if (collides) {
        console.log("Dates are colliding");
        return res.status(409).json({
          status: "failed",
          error: {
            message:
              "Dates of the new sprint are colliding with another sprint in the project",
            sprint: sprint,
          },
        });
      }
    }
    console.log("Dates are not colliding");
    const newSprint = await SprintService.createNewSprint(projectId, req.body);
    res.status(201).json(newSprint);
  } catch (err) {
    general_error_handler(req, res, next);
  }
};

const updateSprint: RequestHandler = async (req, res, next) => {
  try {
    console.log("ENTERED");
    const sprintId = parseInt(req.params.id, 10);
    const thisSprint = await SprintService.getSprintById(sprintId);
    console.log(thisSprint);
    if (req.body.startDate || req.body.endDate) {
      const allSprints = await SprintService.getAllSprints(
        thisSprint.projectId
      );
      const newDates = {
        startDate: req.body.startDate
          ? new Date(req.body.startDate)
          : thisSprint.startDate,
        endDate: req.body.endDate
          ? new Date(req.body.endDate)
          : thisSprint.endDate,
      };
      console.log(newDates);
      if (!SprintService.dateInOrder(newDates)) {
        return res.status(409).json({
          status: "failed",
          error: {
            message: "endDate should be later than startDate",
            proposedDates: newDates,
          },
        });
      }
      for (let sprint of allSprints) {
        if (sprint.id != sprintId) {
          const collides = await SprintService.collidingDates(sprint, newDates);
          if (collides) {
            console.log("Dates are colliding on sprint update");
            return res.status(409).json({
              status: "failed",
              error: {
                message:
                  "Dates of updated sprints are colliding with another sprint in the project, ABORTING UPDATE",
                sprint: sprint,
              },
            });
          }
        }
      }
    }

    const updatedSprint = await SprintService.updateSprint(sprintId, req.body);
    res.status(201).json(updatedSprint);
  } catch (err) {
    general_error_handler(req, res, next);
  }
};

const getAll: RequestHandler = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const sprints = await SprintService.getAllSprints(projectId);
    res.status(200).json(sprints);
  } catch (err) {
    general_error_handler(req, res, next);
  }
};

const SprintController = {
  getCurrent,
  getAll,
  createSprint,
  updateSprint,
};

export default SprintController;
