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
}

const createSprint: RequestHandler = async (req, res, next) => {
    try {
        console.log("Creating new sprint")
        const projectId = parseInt(req.params.projectId);
        console.log("THis is project ID:", projectId)
        const allSprints = await SprintService.getAllSprints(projectId);
        console.log("These are all sprints", allSprints)
        const newDates = {
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate)
        }
        for (let sprint of allSprints) {
            console.log("chekcing colliding")
            const collides = await SprintService.collidingDates(sprint, newDates);
            if (collides) {
                console.log("Dates are colliding")
                return res.status(409).json({
                    status: "failed",
                    error: {
                        message: "Dates of the new sprint are colliding with another sprint in the project",
                        sprint: sprint
                    }
                })
            }
        }
        console.log("Dates are not colliding")
        const newSprint = await SprintService.createNewSprint(projectId, req.body);
        res.status(201).json(newSprint);
    } catch (err) {
        general_error_handler(req, res, next);
    }
}

const getAll: RequestHandler = async (req, res, next) => {
    try {
        const projectId = parseInt(req.params.projectId);
        const sprints = await SprintService.getAllSprints(projectId);
        res.status(200).json(sprints);
    } catch (err) {
        general_error_handler(req, res, next);
    }
}

const SprintController = {
    getCurrent,
    getAll,
    createSprint
}

export default SprintController