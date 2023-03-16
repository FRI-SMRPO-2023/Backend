import { RequestHandler } from "express";
import { general_error_handler } from "../utils/error_handling";


const getAll: RequestHandler = async (req, res, next) => {
    try {
        const projectId = parseInt(req.params.projectId);
        const storyId = parseInt(req.params.storyId);
        // const tasks = await //TODO
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const TaskController = {
    getAll
};

export default TaskController;
