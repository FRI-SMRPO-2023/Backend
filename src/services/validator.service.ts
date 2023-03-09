import {validate, validateIdParam} from "../middleware/validateResources";
import {ProjectSchema, PartialProjectSchema} from "../schemas/project.schema"
import { UsersOnProjectsSchema } from "../schemas/usersOnProjects.schema";

export const validateProject = validate(ProjectSchema);
export const validateUpdateProject = validate(PartialProjectSchema);
export const validateUsersOnProjects = validate(UsersOnProjectsSchema);

//validate if the ids are actually valid numbers
export const validateId = validateIdParam("id");
export const validateProjectId = validateIdParam("projectId");
export const validateUserId = validateIdParam("userId");