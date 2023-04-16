import express from "express";
import TaskController from "../controller/task.controller";
import TimeLogController from "../controller/timelog.controller";
import { validateTaskUpdate } from "../services/validator.service";
import { lowercaseDescription } from "../middleware/toLowercase";
const taskRouter = express.Router();

/**
 * @openapi
 * /api/tasks/{taskId}:
 *  patch:
 *      summary: Update any (or multiple) fields in the story
 *      tags: [Task]
 *      parameters:
 *      - in: path
 *        name: taskId
 *        schema:
 *          type: integer
 *        required: true
 *      responses:
 *          200:
 *              description: Update successful
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/TaskReturn'
 *          409:
 *              description: Task with specified id does not exist
 * 
 *  delete:
 *      summary: Delete task by id
 *      tags: [Task]
 *      parameters:
 *      - in: path
 *        name: taskId
 *        schema:
 *          type: integer
 *        required: true
 *      responses:
 *          204:
 *              description: Delete successful
 *          409:
 *              description: Task with specified id does not exist
 *                      
 *  get:
 *    summary: Get task by id
 *    tags: [Task]
 *    parameters:
 *    - in: path
 *      name: taskId
 *      schema:
 *        type: integer
 *      required: true
 *    responses:
 *      200:
 *         description: Single object returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/TaskReturn'
 *      409:
 *          description: Task with specified id does not exist
 */
taskRouter.route("/:id")
    .get(TaskController.getById)
    .patch(lowercaseDescription, TaskController.updateTask)
    .delete(validateTaskUpdate, TaskController.deleteTask);


/**
 * @openapi
 * /api/tasks/{taskId}/timelogs:
 *  get:
 *    summary: get all timelogs of certain task
 *    tags: [Task, TimeLog]
 *    parameters:
 *    - in: path
 *      name: taskId
 *      schema:
 *        type: integer
 *      required: true
 *    responses:
 *      200:
 *         description: multiple objects returned successfully
 *         content:
 *           application/json:
 *             schema:
*                  type: array
*                  items:
 *                   $ref: '#/components/schemas/TimeLogReturn'
 *      409:
 *          description: Task with specified id does not exist
 */
taskRouter.route("/:taskId/timelogs")
    .get(TimeLogController.getTimeLogsOfTask)

export default taskRouter
