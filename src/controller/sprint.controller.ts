import { RequestHandler } from "express";
import { general_error_handler } from "../utils/error_handling";
import SprintService from "../services/sprint.service";

const getCurrent: RequestHandler = async (req, res, next) => {
    try {
        const currSprint = await SprintService.getCurrentSprint();
        res.status(200).json(currSprint);
    } catch (err) {
        general_error_handler(req, res, next);
    }
}

const createSprint: RequestHandler = async (req, res, next) => {
    try {
        const newSprint = await SprintService.createNewSprint(req.body);
        res.status(201).json(newSprint);
    } catch (err) {
        general_error_handler(req, res, next);
    }
}

const getAll: RequestHandler = async (req, res, next) => {
    try {
        const sprints = await SprintService.getAllSprints();
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