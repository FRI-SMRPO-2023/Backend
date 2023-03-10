import {validate, validateIdParam} from "../middleware/validateResources";
import {ProjectCreateSchema, ProjectUpdateSchema} from "../schemas/project.schema"
import { UsersOnProjectsSchema } from "../schemas/usersOnProjects.schema";

export const validateProject = validate(ProjectCreateSchema);
export const validateUpdateProject = validate(ProjectUpdateSchema);
export const validateUsersOnProjects = validate(UsersOnProjectsSchema);

//validate if the ids are actually valid numbers
export const validateId = validateIdParam("id");
export const validateProjectId = validateIdParam("projectId");
export const validateUserId = validateIdParam("userId");