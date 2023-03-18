import express from "express";
import UsersOnProjectsController  from "../controller/usersOnProject.controller";
import { validateProjectId, validateUserId, validateUsersOnProjects } from "../services/validator.service";
import { adminOrCorrectUser, adminAuthorizer } from "../middleware/authorizeUser";



const usersOnProjectsRouter = express.Router();

/**
 * @openapi
 * tags:
 *   name: UsersOnProjects
 *   description: Adding users to projects and getting projects of users and users of projects
 *  
 * /api/projects/{id}/users:
 *   get:
 *     summary: Get all users of project with id
 *     tags: [UsersOnProjects]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/UserOnProject'
 *               
 *         description: Return all a list of all users on a project
 * /api/users/{id}/projects:
 *   get:
 *     summary: Get all projects of user with id
 *     tags: [UsersOnProjects]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *     - in: query
 *       name: project
 *       schema:
 *         type: boolean
 *       description: Include the whole project object in return body, not just the id
 *     - in: query
 *       name: user
 *       schema:
 *         type: boolean
 *       description: Include the whole user object in return body, not just the id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/UserOnProject'
 *         description: Return all a list of all projects of a user            
 * 
 * /api/users/{userId}/projects/{projectId}:
 *   get:
 *     summary: Get role for a single user in a single project
 *     tags: [UsersOnProjects]
 *     parameters:
 *     - in: path
 *       name: userId
 *       schema:
 *         type: integer
 *       required: true
 *     - in: path
 *       name: projectId
 *       schema:
 *         type: integer
 *       required: true 
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserOnProject'
 *         description: Return all a single UserOnProject resource          
 */
//get 
usersOnProjectsRouter.get("/projects/:projectId/users", validateProjectId, UsersOnProjectsController.getUsersOfProject);
usersOnProjectsRouter.get("/users/:userId/projects", validateUserId, UsersOnProjectsController.getProjectsOfUser);
usersOnProjectsRouter.get("/users/:userId/projects/:projectId", adminOrCorrectUser, validateUserId, validateProjectId, UsersOnProjectsController.getSingle)
/**
 * @openapi  
 * /api/projects/{projectId}/users{userId}:
 *   delete:
 *     summary: Remove user from a project
 *     tags: [UsersOnProjects]
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *         type: integer
 *       required: true
 *     - in: path
 *       name: userId
 *       schema:
 *         type: integer
 *       required: true
 *     responses:
 *       204:    
 *         description: User successfully removed       
 */
//delete
usersOnProjectsRouter.delete("/projects/:projectId/users/:userId", validateProjectId, validateUserId, UsersOnProjectsController.removeUserFromProject);
usersOnProjectsRouter.delete("/users/:userId/projects/:projectId", validateProjectId, validateUserId, UsersOnProjectsController.removeUserFromProject);

/**
 * @openapi
 * /api/project-roles:
 *   post:
 *     summary: Add user to a project with specified project role
 *     tags: [UsersOnProjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserOnProject'
 *     responses:
 *       201:
 *         description: User added to the project. Return the UserOnProject resource.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserOnProject'
 *       409:
 *         description: User with specified id already part of the project
 *       500:
 *         description: Some server error
 *              
 */

//create
usersOnProjectsRouter.post("/project-roles", validateUsersOnProjects, UsersOnProjectsController.addUserToProject);


export default usersOnProjectsRouter;