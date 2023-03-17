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
 *      UserOnProject:
 *        type: object
 *        properties:
 *          userId:
 *            type: number
 *          projectId:
 *            type: number
 *          role:
 *            $ref: '#/components/schemas/RoleInProject'
 *        example:
 *          userId: 1
 *          projectId: 2
 *          role: "ScrumMaster"
 */

// for body validation in post request
export const UsersOnProjectsSchema = z.object({
    userId: z.number(),
    projectId: z.number(),
    role: convertEnum(RoleInProject),
    
});