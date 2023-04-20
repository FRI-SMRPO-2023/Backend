import express from "express";
import UsersOnProjectsController from "../controller/usersOnProject.controller";
import {
  validateProjectId,
  validateUserId,
  validateUsersOnProjects,
} from "../services/validator.service";
import {
  adminAuthorizer,
  isSM,
} from "../middleware/authorizeUser";

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
 *                  type: object
 *                  properties:
 *                      role:
 *                          $ref: '#/components/schemas/RoleInProject'
 *                      user:
 *                          $ref: '#/components/schemas/UserReturn'
 *         description: Return all a list of all users on a project and their roles
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
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                      role:
 *                          $ref: '#/components/schemas/RoleOnProject'
 *                      project:
 *                          $ref: '#/components/schemas/ProjectReturn'
 *         description: Return all a list of all projects of a user and a role
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
usersOnProjectsRouter.get(
  "/projects/:projectId/users",
  validateProjectId,
  UsersOnProjectsController.getUsersOfProject
);
usersOnProjectsRouter.get(
  "/users/:userId/projects",
  validateUserId,
  UsersOnProjectsController.getProjectsOfUser
);
usersOnProjectsRouter.get(
  "/users/:userId/projects/:projectId",
  validateUserId,
  validateProjectId,
  UsersOnProjectsController.getSingle
);
usersOnProjectsRouter.patch(
  "/users/:userId/projects/:projectId",
  validateUserId,
  validateProjectId,
  UsersOnProjectsController.changeUserRole
);

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
usersOnProjectsRouter.delete(
  "/projects/:projectId/users/:userId",
  adminAuthorizer,
  validateProjectId,
  validateUserId,
  UsersOnProjectsController.removeUserFromProject
);
usersOnProjectsRouter.delete(
  "/users/:userId/projects/:projectId",
  adminAuthorizer,
  validateProjectId,
  validateUserId,
  UsersOnProjectsController.removeUserFromProject
);

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
 * /api/projects/{projectId}/project-roles-createmany:
 *   post:
 *     summary: Add multiple users to a project. Secondary role is optional. If the user already exists, just set the field "active" to true
 *     tags: [UsersOnProjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: array
 *              items:
 *               type: object
 *               properties:                                   
 *                 userId:                                     
 *                   type: number                              
 *                 role:                                       
 *                   $ref: '#/components/schemas/RoleInProject'
 *                 secondaryRole:                              
 *                   $ref: '#/components/schemas/RoleInProject'
 *               example:                                      
 *                 userId: 1                                   
 *                 role: ScrumMaster                           
 *                 secondaryRole: Developer                    
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
 * /api/projects/{projectId}/project-roles-updatemany:
 *   post:
 *     summary: Update multiple users in a project. Any field is optional, except userId. Can also set "active" to false to soft-delete 
 *     tags: [UsersOnProjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: array
 *              items:
 *               type: object
 *               properties:                                   
 *                 userId:                                     
 *                   type: number                              
 *                 role:                                       
 *                   $ref: '#/components/schemas/RoleInProject'
 *                 secondaryRole:                              
 *                   $ref: '#/components/schemas/RoleInProject'
 *                 active:                                     
 *                   type: bool
 *               example:                                      
 *                 userId: 1                                   
 *                 role: ScrumMaster                           
 *                 secondaryRole: Developer                    
 *                 active: true
 *     responses:
 *       201:
 *         description: User added to the project. Return the UserOnProject and the user is actually full.
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                type: object
 *                properties:                                   
 *                  userId:                                     
 *                    type: number                              
 *                  role:                                       
 *                    $ref: '#/components/schemas/RoleInProject'
 *                  secondaryRole:                              
 *                    $ref: '#/components/schemas/RoleInProject'
 *                  active:                                     
 *                    type: bool
 *                example:                                      
 *                  userId: 1                                   
 *                  role: ScrumMaster                           
 *                  secondaryRole: Developer                    
 *                  active: true
 *       409:
 *         description: User with specified id already part of the project
 *       500:
 *         description: Some server error
 */

//create
usersOnProjectsRouter.post(
  "/project-roles",
  isSM,
  validateUsersOnProjects,
  UsersOnProjectsController.addUserToProject
);
usersOnProjectsRouter.post(
  "/projects/:projectId/project-roles-updatemany",
  isSM,
  UsersOnProjectsController.changeMultipleUserRoles
);
usersOnProjectsRouter.post(
  "/projects/:projectId/project-roles-createmany",
  isSM,
  UsersOnProjectsController.createMultipleUserRoles
);

export default usersOnProjectsRouter;
