import { RequestHandler } from "express";
import { general_error_handler } from "../utils/error_handling";
import TimeLogService from "../services/timelog.service";
import { stripTime } from "../utils/datetime_conversion";

const getTimeLogsOfStory: RequestHandler = async (req, res, next) => {
  try {
    const storyId = parseInt(req.params.storyId);
    const timelogs = await TimeLogService.getTimeLogs(storyId);
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
}

const TimeLogController = {
  getTimeLogsOfStory,
  createTimeLogs
};

export default TimeLogController;
