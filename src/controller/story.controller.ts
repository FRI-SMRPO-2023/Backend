
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";
import StoryService from "../services/story.service"
import { general_error_handler } from "../utils/error_handling";


const getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = parseInt(req.params.projectId)
        const stories = await StoryService.getAllStories(projectId);
        res.status(200).json(stories);
    } catch (err) {
        general_error_handler(err, res, next);
    }
};

const findbyId: RequestHandler = async (req, res, next) => {
    try {
        let id = parseInt(req.params.storyId);
        const story = await StoryService.getStoryById(id);
        res.status(200).json(story);
    } catch (err) {
        general_error_handler(err, res, next);
    }
};

const create: RequestHandler = async (req, res, next) => {
    try {
        let projectId = parseInt(req.params.projectId);
        const story = await StoryService.createStory(projectId, req.body);
        res.status(201).json(story);
    } catch (err) {
        general_error_handler(err, res, next, "Story with this name already exists in this project");
    }
};

const deletebyId: RequestHandler = async (req, res, next) => {
    try {
        let id = parseInt(req.params.storyId);
        const story = await StoryService.deleteStory(id);
        res.status(204).json(story);
    } catch (err) {
        general_error_handler(err, res, next);
    }
};

const updatebyId: RequestHandler = async (req, res, next) => {
    try {
        let id = parseInt(req.params.storyId);
        let updated = await StoryService.updateStory(id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const StoryController = {
    getAll,
    findbyId,
    create,
    deletebyId,
    updatebyId
}

export default StoryController;