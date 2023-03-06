import validate from "../middleware/validateResources";
import {ProjectSchema, PartialProjectSchema} from "../schemas/project.schema"

export const validateProject = validate(ProjectSchema);
export const validateUpdateProject = validate(PartialProjectSchema)