
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";
import ProjectService from "../services/project.service"
import { general_error_handler } from "../utils/error_handling";


const getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await ProjectService.getAllProjects();
        res.status(200).json(projects);
    } catch (err) {
        general_error_handler(err, res, next);
    }
};

const findbyId: RequestHandler = async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        const user = await ProjectService.getProjectById(id);
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        general_error_handler(err, res, next);
    }
};

const create: RequestHandler = async (req, res, next) => {
    try {
        const project = await ProjectService.createProject(req.body);
        res.status(201).json(project);
    } catch (err) {
        general_error_handler(err, res, next);
    }
};

const deletebyId: RequestHandler = async (req, res, next) => {
    try {
        // TODO zod validation of numbers or change to UUID
        let id = parseInt(req.params.id);
        const project = await ProjectService.deleteProject(id);
        res.status(204).json(project);
    } catch (err) {
        general_error_handler(err, res, next);
    }
};

const updatebyId: RequestHandler = async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let updated = await ProjectService.updateProject(id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

// const getStoriesOfProject: RequestHandler = async (req, res, next) => {
//     try {
//         let projectId = parseInt(req.params.id);
//         let stories = await ProjectService.getStories(projectId)
//     } catch (err) {
//         general_error_handler(err, res, next)
//     }
// }

const ProjectController = {
    getAll,
    findbyId,
    create,
    deletebyId,
    updatebyId
}

export default ProjectController;