import { z } from 'zod';

interface ProjectBase {
    name: string;
    description: string;
}
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
 *          allOf:
 *              - $ref: '#/components/schemas/ProjectCreate'
 *              - type: object
 *                properties:
 *                    id:
 *                      type: number
 *                example:
 *                  id: 1
 *                  name: Frogify
 *                  description: Project about musical frogs
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