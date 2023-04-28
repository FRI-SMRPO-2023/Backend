import { RequestHandler } from "express";
import { general_error_handler, return_error } from "../utils/error_handling";
import SprintService from "../services/sprint.service";

const getCurrent: RequestHandler = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const currSprint = await SprintService.getCurrentSprint(projectId);
    res.status(200).json(currSprint);
  } catch (err: any) {
    general_error_handler(err, res, next);
  }
};

const createSprint: RequestHandler = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const allSprints = await SprintService.getAllSprints(projectId);
    const newDates = {
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
    };
    if (newDates.startDate.getDay() == 0 || newDates.startDate.getDay() == 6) {
      return return_error("Start date should not be on a weekend", res, next);
    }
    if (newDates.endDate.getDay() == 0 || newDates.endDate.getDay() == 6) {
      return return_error("End date should not be on a weekend", res, next);
    }
    var today = new Date();
    today.setDate(today.getDate() - 1);
    if (newDates.startDate < today) {
      return return_error("Can't create new sprint in the past", res, next);
    }
    if (!SprintService.dateInOrder(newDates)) {
      return return_error(
        "End Date should be later than Start Date",
        res,
        next
      );
    }
    for (let sprint of allSprints) {
      const collides = await SprintService.collidingDates(sprint, newDates);
      if (collides) {
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
    const newSprint = await SprintService.createNewSprint(projectId, req.body);
    res.status(201).json(newSprint);
  } catch (err: any) {
    general_error_handler(err, res, next);
  }
};

const updateSprint: RequestHandler = async (req, res, next) => {
  try {
    const sprintId = parseInt(req.params.id, 10);
    const thisSprint = await SprintService.getSprintById(sprintId);
    if (thisSprint == null) {
      return res.status(409).json({
        status: "failed",
        error: {
          message: "sprint with this ID doesn't exist",
        },
      });
    }
    if (thisSprint.endDate < new Date()) {
      return return_error("Can't update past sprints", res, next);
    }
    if (req.body.startDate || req.body.endDate) {
      if (thisSprint.startDate <= new Date()) {
        return return_error(
          "Can't update dates of the current or past sprints",
          res,
          next
        );
      }
      const newDates = {
        startDate: req.body.startDate
          ? new Date(req.body.startDate)
          : thisSprint.startDate,
        endDate: req.body.endDate
          ? new Date(req.body.endDate)
          : thisSprint.endDate,
      };
      const allSprints = await SprintService.getAllSprints(
        thisSprint.projectId
      );
      if (
        newDates.startDate.getDay() == 0 ||
        newDates.startDate.getDay() == 6
      ) {
        return return_error("Start date should not be on a weekend", res, next);
      }
      if (newDates.endDate.getDay() == 0 || newDates.endDate.getDay() == 6) {
        return return_error("End date should not be on a weekend", res, next);
      }
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
            return res.status(409).json({
              status: "failed",
              error: {
                message:
                  "Dates of updated sprints are colliding with another sprint in the project",
                sprint: sprint,
              },
            });
          }
        }
      }
      if (newDates.startDate < new Date()) {
        return return_error("Can't update sprint date to the past", res, next);
      }
    }

    const updatedSprint = await SprintService.updateSprint(sprintId, req.body);
    res.status(201).json(updatedSprint);
  } catch (err: any) {
    general_error_handler(err, res, next);
  }
};

const deleteSprint: RequestHandler = async (req, res, next) => {
  try {
    const sprintId = parseInt(req.params.id);
    const thisSprint = await SprintService.getSprintById(sprintId);
    if (!thisSprint) {
      return res.sendStatus(204);
    }
    var curDate = new Date();
    if (thisSprint.startDate <= curDate) {
      return return_error(
        "Can't delete current or previous sprints",
        res,
        next
      );
    }
    await SprintService.deleteSprint(sprintId);
    res.sendStatus(204);
  } catch (err: any) {
    general_error_handler(err, res, next);
  }
};

const getAll: RequestHandler = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const sprints = await SprintService.getAllSprints(projectId);
    res.status(200).json(sprints);
  } catch (err: any) {
    general_error_handler(err, res, next);
  }
};

const getSingle: RequestHandler = async (req, res, next) => {
  try {
    const sprintId = parseInt(req.params.id);
    const sprints = await SprintService.getSprintById(sprintId);
    res.status(200).json(sprints);
  } catch (err: any) {
    general_error_handler(err, res, next, "Sprint with this id does not exist");
  }
};

const SprintController = {
  getCurrent,
  getAll,
  getSingle,
  createSprint,
  updateSprint,
  deleteSprint,
};

export default SprintController;
