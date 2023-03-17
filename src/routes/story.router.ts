import express from "express";
import StoryController from "../controller/story.controller";
import TaskController from "../controller/task.controller";
import {validateStoryUpdate, validateId} from "../services/validator.service";
import { validateTaskCreate } from "../services/validator.service";

//EVERYTHING IS INSIDE project.router.ts, since it's a one-to-many relationship
// and i encoutered some bugs, which didn't allow for separate story router 

const storyRouter = express.Router();

/**
 * @openapi
 * /api/stories/{storyId}:
 *  patch:
 *      summary: Update any (or multiple) fields in the story
 *      tags: [Story]
 *      parameters:
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

storyRouter.route("/:id").all(validateId)
        .get(StoryController.findbyId)
        .delete(StoryController.deletebyId)
        .patch(validateStoryUpdate, StoryController.updatebyId)

        
storyRouter.route("/:storyId/tasks")
        .get(TaskController.getAllFromStory)
        .post(validateTaskCreate, TaskController.createNewTask);

export default storyRouter;