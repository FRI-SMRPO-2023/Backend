import express from "express";
import ProjectController from "../controller/project.controller";
import StoryController from "../controller/story.controller";
import SprintController from "../controller/sprint.controller";
import {validateProjectCreate, 
        validateProjectUpdate, 
        validateId, 
        validateProjectId, 
        validateStoryCreate, 
        validateStoryId,
        validateStoryUpdate,
        validateTaskId,
        validateSprintCreate} from "../services/validator.service";
import { lowercaseName } from "../middleware/toLowercase";
import { isPOorSM, isSM, adminAuthorizer } from "../middleware/authorizeUser";
import TaskController from "../controller/task.controller";


const projectRouter = express.Router();

// projects
/**
 * @openapi
 * tags:
 *   name: Project
 *   description: Project management api
 *  
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ProjectReturn'
 *               
 *         description: Return all a list of all projects
 *   post:
 *     summary: Create a new Project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectCreate'
 *     responses:
 *       201:
 *         description: The created Project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectReturn'
 *       409:
 *         description: Project with specified name already exists.
 *       500:
 *         description: Some server error
 *              
 */

projectRouter.route("/")
        .get(ProjectController.getAll)
        .post(adminAuthorizer, validateProjectCreate, lowercaseName, ProjectController.create);


/**
 * @openapi
 * /api/projects/{id}:
 *  patch:
 *      summary: Update any (or multiple) fields in the project
 *      tags: [Project]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *      responses:
 *          200:
 *              description: Update successful
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/ProjectReturn'
 *          409:
 *              description: Project with specified id does not exist
 * 
 *  delete:
 *      summary: Delete project by id
 *      tags: [Project]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *      responses:
 *          204:
 *              description: Delete successful
 *          409:
 *              description: Project with specified id does not exist
 *                      
 *  get:
 *    summary: Get project by id
 *    tags: [Project]
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *    responses:
 *      200:
 *         description: Single object returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/ProjectReturn'
 *      409:
 *          description: Project with specified id does not exist
 *     
 */
projectRouter.route("/:id").all(validateId)
        .get(ProjectController.findbyId)
        .delete(ProjectController.deletebyId)
        .patch(validateProjectUpdate, lowercaseName, ProjectController.updatebyId)


// stories
/**
 * @openapi
 * tags:
 *   name: Story
 *   description: Story management api
 *  
 * /api/projects/{projectId}/stories:
 *   get:
 *     summary: Get all stories on certain project
 *     tags: [Story]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/StoryReturn'
 *               
 *         description: Return a list of all stories in a project
 *   post:
 *     summary: Create a new story in a project
 *     tags: [Story]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StoryCreate'
 *     responses:
 *       201:
 *         description: The created story.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoryReturn'
 *       409:
 *         description: Story with specified name in the project.
 *       500:
 *         description: Some server error
 *              
 */

projectRouter.route("/:projectId/stories").all(validateProjectId)
        .get(StoryController.getAll)
        .post(validateStoryCreate, isPOorSM, lowercaseName, StoryController.create)


// sprints
/**
 * @openapi
 * tags:
 *   name: Sprint
 *   description: Sprint management api
 *  
 * /api/projects/{projectId}/sprints:
 *   get:
 *     summary: Get all sprints for the specified project
 *     tags: [Sprint]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
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
 *     summary: Create a new Sprint inside the project
 *     tags: [Sprint]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
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
 *         description: Dates are overlaping with existing sprint. Also returns the overlapping sprint in the project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                     sprint:
 *                       $ref: '#/components/schemas/SprintReturn'
 *             example:
 *               status: failed
 *               error:
 *                 message: Dates of the new sprint are overlapping with existing sprint in the project
 *                 sprint:
 *                   id: 1
 *                   name: badExample
 *                   startDate: "2020-02-01T00:00:00.000Z"
 *                   endDate: "2020-02-28T00:00:00.000Z"
 *                   speed: 20
 *             required:
 *               - status
 *               - error
 *       500:
 *         description: Some server error
 *              
 */

projectRouter.route("/:projectId/sprints")
    .get(SprintController.getAll)
    .post(isSM, validateSprintCreate, SprintController.createSprint)

/**
 * @openapi
 * /api/projects/{projectId}/sprints/current:
 *   get:
 *     summary: Get current sprint (based on current date)
 *     tags: [Sprint]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
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

projectRouter.route("/:projectId/sprints/current")
    .get(SprintController.getCurrent)

/**
 * @openapi
 * /api/projects/{projectId}/sprints/current/tasks:
 *   get:
 *     summary: Get all tasks in the  current sprint (based on current date)
 *     tags: [Sprint, Task]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/TaskReturn'
 *         description: Return current sprint or return null if no such sprint exists
 */
projectRouter.route("/:projectId/sprints/current/tasks")
        .get(TaskController.getAllFromCurrentSprint)

export default projectRouter;
