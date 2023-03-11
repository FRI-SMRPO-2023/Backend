import {validate, validateIdParam} from "../middleware/validateResources";
import {ProjectCreateSchema, ProjectUpdateSchema} from "../schemas/project.schema"
import { UserCreateSchema, UserUpdateSchema, UserPasswordChangeSchema } from "../schemas/users.schema";
import { UsersOnProjectsSchema } from "../schemas/usersOnProjects.schema";

//Project validation
export const validateProjectCreate = validate(ProjectCreateSchema);
export const validateProjectUpdate = validate(ProjectUpdateSchema);

//User validation
export const validateUserCreate = validate(UserCreateSchema);
export const validateUserUpdate = validate(UserUpdateSchema);
export const validateUserPasswordChange = validate(UserPasswordChangeSchema);

//UsersOnProjects validation - pivot table of User and Project
export const validateUsersOnProjects = validate(UsersOnProjectsSchema);

//validate if the ids are actually valid numbers, not just strings
export const validateId = validateIdParam("id");
export const validateProjectId = validateIdParam("projectId");
export const validateUserId = validateIdParam("userId");