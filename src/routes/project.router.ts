import express from "express";
import ProjectController from "../controller/project.controller";
import StoryController from "../controller/story.controller";
import {validateProjectCreate, 
        validateProjectUpdate, 
        validateId, 
        validateProjectId, 
        validateStoryCreate, 
        validateStoryId,
        validateStoryUpdate,
        validateTaskId} from "../services/validator.service";


const projectRouter = express.Router();


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
        .post(validateProjectCreate, ProjectController.create);


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
        .patch(validateProjectUpdate, ProjectController.updatebyId)


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
        .post(validateStoryCreate, StoryController.create)


export default projectRouter;