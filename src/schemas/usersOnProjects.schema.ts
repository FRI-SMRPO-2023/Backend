import { z } from 'zod';
import { RoleInProject } from "@prisma/client"
import { convertEnum } from '../utils/enum_conversion';

import { ProjectWithIdSchema } from './project.schema';
import { UserWithIdSchema } from './users.schema';


/**
 * @openapi
 * components:
 *   schemas:
 *      RoleInProject:
 *        type: string
 *        enum:
 *          - Developer
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

export const UOPProjectReturnSchema = z.object({
    role: convertEnum(RoleInProject),
    project: ProjectWithIdSchema
})

export const UOPUserReturnSchema = z.object({
    role: convertEnum(RoleInProject),
    user: UserWithIdSchema
})

export type UOPProjectReturn = z.infer<typeof UOPProjectReturnSchema>;
export type UOPUserReturn = z.infer<typeof UOPUserReturnSchema>;