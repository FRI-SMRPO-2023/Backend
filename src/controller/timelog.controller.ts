import { RequestHandler } from "express";
import { general_error_handler } from "../utils/error_handling";
import TimeLogService from "../services/timelog.service";

const getTimeLogsOfStory: RequestHandler = async (req, res, next) => {
  try {
    const storyId = parseInt(req.params.storyId);
    const timelogs = await TimeLogService.getTimeLogsStory(storyId);
    res.status(200).json(timelogs);
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const getTimeLogsOfTask: RequestHandler = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const timelogs = await TimeLogService.getTimeLogsTask(taskId);
    res.status(200).json(timelogs);
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const createTimeLogs: RequestHandler = async (req, res, next) => {
  try {
    const timeLog = await TimeLogService.createTimeLog(req.body);
    res.status(201).json(timeLog);
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const updateTimeLogs: RequestHandler = async (req, res, next) => {
  try {
    const timeLogId = parseInt(req.params.id);
    const timeLog = await TimeLogService.updateTimeLog(timeLogId, req.body);
    res.status(201).json(timeLog);
  } catch (err) {
    general_error_handler(err, res, next);
  }
};

const TimeLogController = {
  getTimeLogsOfStory,
  createTimeLogs,
  getTimeLogsOfTask,
  updateTimeLogs,
};

export default TimeLogController;
