import { z } from 'zod';
import { RoleInProject, SecondaryRole } from "@prisma/client"
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
 *          secondaryRole:
 *            $ref: '#/components/schemas/RoleInProject'
 *        example:
 *          userId: 1
 *          projectId: 2
 *          role: "ScrumMaster"
 *          secondaryRole: "Developer"
 */

// for body validation in post request
export const UsersOnProjectsSchema = z.object({
    userId: z.number(),
    projectId: z.number(),
    role: convertEnum<RoleInProject>(RoleInProject),
    secondaryRole: convertEnum<SecondaryRole>(SecondaryRole).or(z.null()).optional()
    
});

export const UOPProjectReturnSchema = z.object({
    role: convertEnum<RoleInProject>(RoleInProject),
    secondaryRole: convertEnum<SecondaryRole>(SecondaryRole).or(z.null()),
    project: ProjectWithIdSchema
})

export const UOPUserReturnSchema = z.object({
    role: convertEnum<RoleInProject>(RoleInProject),
    secondaryRole: convertEnum<SecondaryRole>(SecondaryRole).or(z.null()),
    user: UserWithIdSchema
})

export type UOPProjectReturn = z.infer<typeof UOPProjectReturnSchema>;
export type UOPUserReturn = z.infer<typeof UOPUserReturnSchema>;