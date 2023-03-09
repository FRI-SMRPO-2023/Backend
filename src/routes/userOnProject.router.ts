import express from "express";
import UsersOnProjectsController  from "../controller/usersOnProject.controller";
import { validateProjectId, validateUserId, validateUsersOnProjects } from "../services/validator.service";



const usersOnProjectsRouter = express.Router();

//get
usersOnProjectsRouter.get("/projects/:projectId/users", validateProjectId, UsersOnProjectsController.getUsersOfProject);
usersOnProjectsRouter.get("/users/:userId/projects", validateUserId, UsersOnProjectsController.getProjectsOfUser);

//delete
usersOnProjectsRouter.delete("/projects/:projectId/users/:userId", validateProjectId, validateUserId, UsersOnProjectsController.removeUserFromProject);
usersOnProjectsRouter.delete("/users/:userId/projects/:projectId", validateProjectId, validateUserId, UsersOnProjectsController.removeUserFromProject);

//create
usersOnProjectsRouter.post("/project-roles", validateUsersOnProjects, UsersOnProjectsController.addUserToProject);


export default usersOnProjectsRouter;