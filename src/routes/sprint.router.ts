import express from "express";
import SprintController from "../controller/sprint.controller";
import SprintService from "../services/sprint.service";
import { validateSprintUpdate } from "../services/validator.service";
import { isSMFunc } from "../middleware/authorizeUser";

const sprintRouter = express.Router();

/**
 * @openapi
 * /api/sprint/{id}:
 *  patch:
 *      summary: Update any (or multiple) fields in the sprint
 *      tags: [Sprint]
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
 *                    $ref: '#/components/schemas/SprintReturn'
 *          409:
 *              description: Sprint with specified id does not exist error message
 *
 *  delete:
 *      summary: Delete sprint by id
 *      tags: [Sprint]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *      responses:
 *          204:
 *              description: Delete successful
 */

sprintRouter
  .route("/:id").all(isSMFunc(SprintService.getProjectId))
  .get(SprintController.getSingle)
  .patch(validateSprintUpdate, SprintController.updateSprint)
  .delete(SprintController.deleteSprint);

export default sprintRouter;
