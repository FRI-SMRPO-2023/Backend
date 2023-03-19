import {z} from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *      SprintCreate:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          startDate:
 *            type: string
 *          endDate:
 *            type: string
 *          speed:
 *            type: number
 *        example:
 *          name: snailing
 *          startDate: "2023-03-01"
 *          endDate: "2023-04-01"
 *          speed: 20
 *        required:
 *          - name
 *          - startDate
 *          - endDate
 *          - speed
 *      SprintReturn:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          name:
 *            type: string
 *          startDate:
 *            type: string
 *          endDate:
 *            type: string
 *          speed:
 *            type: number
 *        example:
 *          id: 1
 *          name: snailing
 *          startDate: "2023-03-01"
 *          endDate: "2023-04-01"
 *          speed: 20
 *        required:
 *          - id
 *          - name
 *          - startDate
 *          - endDate
 *          - speed
 */


const SprintBaseSchema = z.object({
    name: z.string({
        required_error: "property 'name' is required"
    }).min(1),
    startDate: z.date({
        required_error: "property 'startDate' is required"
    }),
    endDate: z.date({
        required_error: "property 'endDate' is required"
    }),
    speed: z.number({
        required_error: "property 'speed' is required"
    }),
});

const SprintCreateSchema = SprintBaseSchema;
const SprintReturnSchema = SprintCreateSchema.merge(z.object({
    id: z.number()
}));
const SprintUpdateSchema = SprintCreateSchema.partial();

export type SprintCreate = z.infer<typeof SprintCreateSchema>;
export type SprintReturn = z.infer<typeof SprintReturnSchema>;
export type SprintUpdate = z.infer<typeof SprintUpdateSchema>;

