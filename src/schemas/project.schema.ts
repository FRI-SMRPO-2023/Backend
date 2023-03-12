import { z } from 'zod';
import { convertEnum } from '../utils/enum_conversion';
import { RoleInProject } from '@prisma/client';

const HasId = z.object({
    id: z.number(),
})

export const ProjectBaseSchema = z.object({
    name: z.string({
        required_error: "Project name is required",
    })
        .trim()
        .min(1, "Project name cannot be empty"),
    description: z.string({
        required_error: "Project description is required",
    })
});


/**
 * @openapi
 * components:
 *   schemas:
 *      ProjectCreate:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          description:
 *            type: string
 *        example:
 *          name: Frogify
 *          description: Project about musical frogs
 *        required:
 *          - name
 *          - description
 *      ProjectReturn:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          description:
 *            type: string
 *          id:
 *            type: number
 *        example:
 *          name: Frogify
 *          description: Project about musical frogs
 *          id: 1
 *        required:
 *          - name
 *          - description
 *          - id
 *          
 */

// exports for zod validations
//used for post creation
export const ProjectCreateSchema = ProjectBaseSchema.merge(z.object({
    users: z.object({
        id: z.number(),
        role: convertEnum(RoleInProject)
    }).array().nonempty()
})).required();

const ProjectWithId = ProjectBaseSchema.merge(HasId);

// used for patch updates, when not every field is required
export const ProjectUpdateSchema = ProjectCreateSchema.partial();

// type exports for typescript functions
export type ProjectCreate = z.infer<typeof ProjectCreateSchema>
export type ProjectUpdate = z.infer<typeof ProjectUpdateSchema>;
export type ProjectWithId = z.infer<typeof ProjectWithId>;