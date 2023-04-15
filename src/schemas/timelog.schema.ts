import {z} from "zod";


const TimeLogBasicSchema = z.object({
    userId: z.number(),
    taskId: z.number(),
    day: z.date(),
    hours: z.number(),
    hours_estimate: z.number()
})

export const TimeLogReturnSchema = TimeLogBasicSchema.extend({
    id: z.number()
})

export const TimeLogCreateSchema = TimeLogBasicSchema.extend({
    hours_estimate: z.number().optional(),
    day: z.string().datetime().or(z.date())
})

export type TimeLogReturn = z.infer<typeof TimeLogReturnSchema>
export type TimeLogCreate = z.infer<typeof TimeLogCreateSchema>
