import { z } from 'zod';

const HasId = z.object({
    id: z.number(),
})


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
export const ProjectSchema = z.object({
    name: z.string({
        required_error: "Project name is required",
    })
        .trim()
        .min(1, "Project name cannot be empty"),
    description: z.string({
        required_error: "Project description is required",
    })
});

const ProjectWithId = ProjectSchema.merge(HasId);
export const PartialProjectSchema = ProjectSchema.partial();

export type CreateProjectDTO = z.infer<typeof ProjectSchema>
export type UpdateProjectDTO = z.infer<typeof PartialProjectSchema>;
export type Project = z.infer<typeof ProjectWithId>;