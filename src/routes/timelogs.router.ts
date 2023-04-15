import express from "express";
import TimeLogController from "../controller/timelog.controller";
import { validateTimeLogCreate } from "../services/validator.service";

const timelogRouter = express.Router();

/**
 * @openapi
 * tags:
 *   name: TimeLog 
 *   description: TimeLog management api
 *
 * /api/timelogs:
 *   post:
 *     summary: create a new timelog (or append time to existing timelog) 
 *     tags: [TimeLog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeLogCreate'
 *     responses:
 *       201:
 *         description: Timelog created / update. Return the created/updated time log.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeLogReturn'
 *       500:
 *         description: Some server error
 */

timelogRouter
  .route("/")
  .post(validateTimeLogCreate, TimeLogController.createTimeLogs);

export default timelogRouter;
