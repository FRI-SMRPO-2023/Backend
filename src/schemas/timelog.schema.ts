import { z } from "zod";


/**
 * @openapi
 * components:
 *   schemas:
 *      TimeLogCreate:
 *        type: object
 *        properties:
 *          userId:
 *            type: number 
 *            example: 1 
 *          taskId:
 *            type: number 
 *            example: 1 
 *          day:
 *            type: string
 *            example: "2023-01-03" 
 *            description: YYYY-MM-DD date format 
 *          hours:
 *            example: 1.5 
 *            type: number 
 *            description: can be float number, but positive 
 *        required:
 *          - userId 
 *          - taskId 
 *          - day 
 *          - hours 
 *      TimeLogReturn:
 *        type: object
 *        properties:
 *          id:
 *            type: number 
 *            example: 1 
 *          userId:
 *            type: number 
 *            example: 1 
 *          taskId:
 *            type: number 
 *            example: 1 
 *          day:
 *            type: string
 *            example: "2023-01-03" 
 *            description: YYYY-MM-DD date format 
 *          hours:
 *            example: 1.5 
 *            type: number 
 *            description: can be float number, but positive 
 *          hours_estimate:
 *            example: 7.0 
 *            type: number 
 *            description: can be float number, but positive 
 *        required:
 *          - id 
 *          - userId 
 *          - taskId 
 *          - day 
 *          - hours 
 *          - hours_estimate 
 */

const TimeLogBasicSchema = z.object({
  userId: z.number(),
  taskId: z.number(),
  day: z
    .string({
      required_error: "property 'day' is required",
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "startDate should be of the form YYYY-MM-DD").or(z.date()),
  hours: z.number(),
  hours_estimate: z.number(),
});

export const TimeLogReturnSchema = TimeLogBasicSchema.extend({
  id: z.number(),
});

export const TimeLogCreateSchema = TimeLogBasicSchema.extend({
  hours_estimate: z.number().optional(),
});

export type TimeLogReturn = z.infer<typeof TimeLogReturnSchema>;
export type TimeLogCreate = z.infer<typeof TimeLogCreateSchema>;
