import { z } from "zod"


const TaskBaseSchema = z.object({
    storyId: z.number(),
    description: z.string().min(1),
    timeEstimation: z.string(),
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
