import express from "express";
import StoryController from "../controller/story.controller";
import {validateStoryCreate, validateStoryUpdate, validateId} from "../services/validator.service";


const storyRouter = express.Router();


/**
 * @openapi
 * tags:
 *   name: Story
 *   description: Story management api
 *  
 * /api/projects/{projectId}/stories:
 *   get:
 *     summary: Get all stories of certain project
 *     tags: [Story]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/StoryReturn'
 *               
 *         description: Return all a list of all stories at specific project
 *   post:
 *     summary: Create a new Story in a project
 *     tags: [Story]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StoryCreate'
 *     responses:
 *       201:
 *         description: The created Story.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoryReturn'
 *       409:
 *         description: Story with specified name already exists.
 *       500:
 *         description: Some server error
 *              
 */

// storyRouter.route("/")
//         .get(StoryController.getAll)
//         .post(validateStoryCreate, StoryController.create);

// storyRouter.route("/")
//         .get(StoryController.getAll)
//         .post(validateStoryCreate, StoryController.create)

/**
 * @openapi
 * /api/projects/{projectId}/stories/{storyId}:
 *  patch:
 *      summary: Update any (or multiple) fields in the story
 *      tags: [Story]
 *      parameters:
 *      - in: path
 *        name: projectId
 *        schema:
 *          type: integer
 *        required: true
 *      - in: path
 *        name: storyId
 *        schema:
 *          type: integer
 *        required: true
 *      responses:
 *          200:
 *              description: Update successful
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/StoryReturn'
 *          409:
 *              description: Story with specified id does not exist
 * 
 *  delete:
 *      summary: Delete story by id
 *      tags: [Story]
 *      parameters:
 *      - in: path
 *        name: projectId
 *        schema:
 *          type: integer
 *        required: true
 *      - in: path
 *        name: storyId
 *        schema:
 *          type: integer
 *        required: true
 *      responses:
 *          204:
 *              description: Delete successful
 *          409:
 *              description: Story with specified id does not exist
 *                      
 *  get:
 *    summary: Get story by id
 *    tags: [Story]
 *    parameters:
 *    - in: path
 *      name: projectId
 *      schema:
 *        type: integer
 *      required: true
 *    - in: path
 *      name: storyId
 *      schema:
 *        type: integer
 *      required: true
 *    responses:
 *      200:
 *         description: Single object returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/StoryReturn'
 *      409:
 *          description: Story with specified id does not exist
 *     
 */
// storyRouter.route("/:storyId").all(validateId)
//         .get(StoryController.findbyId)
//         .delete(StoryController.deletebyId)
//         .patch(validateStoryUpdate, StoryController.updatebyId)

export default storyRouter;