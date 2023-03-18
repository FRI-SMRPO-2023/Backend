import { z } from "zod"

/**
 * @openapi
 * components:
 *   schemas:
 *      TaskCreate:
 *        type: object
 *        properties:
 *          description:
 *            type: string
 *          timeEstimation:
 *            type: string
 *          status:
 *            $ref: '#/components/schemas/TaskStatus'
 *          asigneeId:
 *            type: number
 *        example:
 *          description: Create new database
 *          timeEstimation: 10H
 *          status: Assigned
 *          asigneeId: 2
 *        required:
 *          - description
 *          - timeEstimation
 *          - status
 *          - asigneeId
 *      TaskReturn:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          description:
 *            type: string
 *          timeEstimation:
 *            type: string
 *          status:
 *            $ref: '#/components/schemas/TaskStatus'
 *          asigneeId:
 *            type: number
 *        example:
 *          id: 1
 *          description: Create new database
 *          timeEstimation: 10H
 *          status: Assigned
 *          asigneeId: 2
 *        required:
 *          - id
 *          - description
 *          - timeEstimation
 *          - status
 *          - asigneeId
 *      TaskStatus:
 *        type: string
 *        enum:
 *          - Unassigned
 *          - Assigned
 *          - Active
 *          - Completed
 *          
 */


const TaskBaseSchema = z.object({
    storyId: z.number(),
    description: z.string({
        required_error: "property 'description' is required"
    }).min(1),
    timeEstimation: z.string({
        required_error: "property 'timeEstimation' is required"
    }),
    asigneeId: z.number().or(z.null()).optional(),
    status: z.enum(["Unassigned", "Assigned", "Active", "Completed"])
});


const TaskReturnSchema = TaskBaseSchema.merge(z.object({
    id: z.number()
}))

export const TaskCreateSchema = TaskBaseSchema.omit({storyId: true});
export const TaskUpdateSchema = TaskCreateSchema.partial();


export type TaskCreate = z.infer<typeof TaskCreateSchema>;
export type TaskReturn = z.infer<typeof TaskReturnSchema>;
export type TaskUpdate = z.infer<typeof TaskUpdateSchema>;
