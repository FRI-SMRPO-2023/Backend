import express from "express";
import SprintController from "../controller/sprint.controller";

const sprintRouter = express.Router();

/**
 * @openapi
 * tags:
 *   name: Sprint
 *   description: Sprint management api
 *  
 * /api/sprints:
 *   get:
 *     summary: Get all sprints
 *     tags: [Sprint]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/SprintReturn'
 *               
 *         description: Return a list of all sprints
 *   post:
 *     summary: Create a new Sprint
 *     tags: [Sprint]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SprintCreate'
 *     responses:
 *       201:
 *         description: The created Sprint.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SprintReturn'
 *       409:
 *         description: Project with specified name already exists.
 *       500:
 *         description: Some server error
 *              
 */

sprintRouter.route("/")
    .get(SprintController.getAll)
    .post(SprintController.createSprint)

/**
 * @openapi
 * /api/sprints/current:
 *   get:
 *     summary: Get current sprint (based on current date)
 *     tags: [Sprint]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/SprintReturn'
 *         description: Return current sprint or return null if no such sprint exists
 */

sprintRouter.route("/current")
    .get(SprintController.getCurrent)

export default sprintRouter;