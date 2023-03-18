import {z} from "zod";


const SprintBaseSchema = z.object({
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

