
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";
import ProjectService from "../services/project.service"


const getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await ProjectService.getAllProjects();
        res.status(200).json(projects);
    } catch (err) {
        next(err)
    }
};

const findbyId: RequestHandler = async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        const user = await ProjectService.getProjectById(id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const create: RequestHandler = async (req, res, next) => {
    try {
        const project = await ProjectService.createProject(req.body);
        res.status(201).json(project);
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            res.status(409).json({
                status: "failed",
                cause: err.meta,
                message: err.message,
            });
        } else {
            next(err)
        }
    }
};

const deletebyId: RequestHandler = async (req, res, next) => {
    try {
        // TODO zod validation of numbers or change to UUID
        let id = parseInt(req.params.id);
        const project = await ProjectService.deleteProject(id);
        res.status(204).json(project);
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            res.status(409).json({
                status: "failed",
                cause: err.meta,
                message: err.message
            });
        } else {
            next(err);
        }
    }
};

const updatebyId: RequestHandler = async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let updated = await ProjectService.updateProject(id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            res.status(409).json({
                status: "failed",
                cause: err.meta,
                message: err.message,
            });
        } else {
            next(err)
        }
    }
}

const ProjectController = {
    getAll,
    findbyId,
    create,
    deletebyId,
    updatebyId
}

export default ProjectController;