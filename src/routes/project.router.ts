import express from "express";
import ProjectController from "../controller/project.controller";
import {validateProject, validateUpdateProject} from "../services/validator.service";


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
 *               $ref: '#/components/schemas/ProjectCreate'
 *       409:
 *         description: Project with specified name already exists.
 *       500:
 *         description: Some server error
 *              
 */
projectRouter.route("/")
        .get(ProjectController.getAll)
        .post(validateProject, ProjectController.create);


/**
 * @openapi
 * /api/projects/{id}:
 *  patch:
 *      summary: Update any (or multiple) fields in the project
 *      tags: [Project]
 *      parameters:
 *      - in: path
 *        name: id
 *        type: integer
 *      responses:
 *          200:
 *              description: Update successfull
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
 *      responses:
 *          204:
 *              description: Delete successfull
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
projectRouter.route("/:id")
        .get(ProjectController.findbyId)
        .delete(ProjectController.deletebyId)
        .patch(validateUpdateProject, ProjectController.updatebyId)

export default projectRouter;