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
        const projectId = parseInt(req.params.projectId);
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