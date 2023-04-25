import { RequestHandler } from "express";
import { general_error_handler } from "../utils/error_handling";
import TaskService from "../services/task.service";

const getAllFromStory: RequestHandler = async (req, res, next) => {
    try {
        const storyId = parseInt(req.params.storyId);
        const task = await TaskService.getTasksOnStory(storyId);
        res.status(200).json(task);
    } catch (err) {
        general_error_handler(err, res, next);
    }
};

const getAllFromCurrentSprint: RequestHandler = async (req, res, next) => {
    try {
        const projectId = parseInt(req.params.projectId);
        const tasks = await TaskService.getTasksOnCurrentSprint(projectId);
        res.status(200).json(tasks);
    } catch (err) {
        general_error_handler(err, res, next);
    }
};

const getById: RequestHandler = async (req, res, next) => {
    try {
        const taskId = parseInt(req.params.taskId);
        const task = await TaskService.getSingle(taskId);
        res.status(200).json(task);
    } catch (err) {
        general_error_handler(err, res, next);
    }
};

const createNewTask: RequestHandler = async (req, res, next) => {
    try {
        const storyId = parseInt(req.params.storyId);
        const task = await TaskService.createTask(storyId, req.body);
        res.status(201).json(task);
    } catch (err) {
        general_error_handler(
            err,
            res,
            next,
            "Task with this description already exists in this story"
        );
    }
};

const updateTask: RequestHandler = async (req, res, next) => {
    try {
        const taskId = parseInt(req.params.id);
        const task = await TaskService.updateTaskById(taskId, req.body);
        res.status(200).json(task);
    } catch (err) {
        general_error_handler(
            err,
            res,
            next,
            "Task with this description already exists in this story"
        );
    }
};

const deleteTask: RequestHandler = async (req, res, next) => {
    try {
        const taskId = parseInt(req.params.id);
        await TaskService.deleteTask(taskId);
        res.sendStatus(204);
    } catch (err) {
        general_error_handler(err, res, next);
    }
};

const TaskController = {
    getAllFromStory,
    getAllFromCurrentSprint,
    getById,
    createNewTask,
    updateTask,
    deleteTask,
};

export default TaskController;
