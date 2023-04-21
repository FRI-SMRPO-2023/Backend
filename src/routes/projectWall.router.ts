import express from "express";
import ProjectWallController from "../controller/projectWall.controller";

const projectWallRouter = express.Router();


/**
 * @openapi
 * /api/wall/{postId}:
 *   get:
 *     summary: Get a post from a project wall by id
 *     tags: [ProjectWall]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the post to retrieve
 *     responses:
 *       200:
 *         description: The post was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectWallReturn'
 *       409:
 *         description: The specified project or post was not found
 *   patch:
 *     summary: Update a post on a project wall
 *     tags: [ProjectWall]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectWallUpdate'
 *     responses:
 *       200:
 *         description: The post was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectWallReturn'
 *       409:
 *         description: The specified project or post was not found
 *   delete:
 *     summary: Delete a post from a project wall
 *     tags: [ProjectWall]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the post to delete
 *     responses:
 *       204:
 *         description: The post was successfully deleted
 *       409:
 *         description: The specified project or post was not found
 */

projectWallRouter
  .route("/:id")
  .get(ProjectWallController.getSingleMessage)
  .delete(ProjectWallController.deleteMessage)
  .patch(ProjectWallController.updateMessage);

export default projectWallRouter;
