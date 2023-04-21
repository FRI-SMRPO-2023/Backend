import ProjectWallService from "../services/projectWall.service";
import { RequestHandler } from "express";
import { general_error_handler } from "../utils/error_handling";

const getAllMessages: RequestHandler = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const posts = await ProjectWallService.getAllMessages(projectId);
    res.status(200).json(posts);
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const getSingleMessage: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const post = await ProjectWallService.getMessageById(id);
    res.status(200).json(post);
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const createMessage: RequestHandler = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const post = await ProjectWallService.createMessage(
      projectId,
      req.body
    );
    res.status(201).json(post);
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const deleteMessage: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const post = await ProjectWallService.deleteMessageById(id);
    res.sendStatus(204);
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const updateMessage: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const post = await ProjectWallService.updateMessageById(id, req.body);
    res.status(200).json(post);
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const ProjectWallController = {
  getAllMessages,
  getSingleMessage,
  createMessage,
  deleteMessage,
  updateMessage,
};

export default ProjectWallController;
