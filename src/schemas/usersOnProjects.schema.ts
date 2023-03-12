import { z } from 'zod';
import { RoleInProject } from "@prisma/client"
import { convertEnum } from '../utils/enum_conversion';


/**
 * @openapi
 * components:
 *   schemas:
 *      RoleInProject:
 *        type: string
 *        enum:
 *          - Developer
 *          - ProjectManager
 *          - ProductOwner
 *          - ScrumMaster
 */

// for body validation in post request
export const UsersOnProjectsSchema = z.object({
    userId: z.number(),
    projectId: z.number(),
    userRole: convertEnum(RoleInProject)
});