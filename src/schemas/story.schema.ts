import { z } from 'zod';
import { priorityConvert } from '../utils/priority_conversion';
import { bvalConvert } from '../utils/businessval_conversion';
import { StoryPriority } from '@prisma/client';
import { BusinessValue } from '@prisma/client';

/**
 * @openapi
 * components:
 *   schemas:
 *      StoryCreate:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          description:
 *            type: string
 *          priority:
 *            $ref: '#/components/schemas/StoryPriority'
 *          businessValue:
 *            $ref: '#/components/schemas/BusinessValue'
 *          acceptanceCriteria:
 *              type: string
 *          status:
 *              type: string
 *          sprintId:
 *              type: [number, 'null']
 * 
 *        example:
 *          name: FrogifyStory
 *          description: Story about musical frogs
 *          priority: MustHave
 *          businessValue: High
 *          acceptanceCriteria: this must work, this must not be allowd
 *          status: SprintBacklog
 *          sprintId: 1
 *        required:
 *          - name
 *          - description
 *          - priority
 *          - businessValue
 *          - acceptanceCriteria
 *          - status
 *          - sprintId
 *      StoryReturn:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          projectId:
 *            type: number
 *          name:
 *            type: string
 *          description:
 *            type: string
 *          priority:
 *            $ref: '#/components/schemas/StoryPriority'
 *          businessValue:
 *            $ref: '#/components/schemas/BusinessValue'
 *          acceptanceCriteria:
 *              type: string
 *          status:
 *              type: string
 *          sprintId:
 *              type: [number, 'null']
 *        example:
 *          id: 1
 *          projectId: 1
 *          name: Frogify
 *          description: Story about musical frogs
 *          priority: MustHave
 *          businessValue: High
 *          acceptanceCriteria: this must work, this must not be allowd
 *          status: SprintBacklog
 *          sprintId: 1
 *        required:
 *          - projectId
 *          - name
 *          - description
 *          - priority
 *          - businessValue
 *          - acceptanceCriteria
 *          - status
 *          - sprintId
 *      StoryPriority:
 *        type: string
 *        enum:
 *          - CouldHave
 *          - ShouldHave
 *          - MustHave
 *          - WontHaveThisTime
 *      BusinessValue:
 *        type: string
 *        enum:
 *          - Low
 *          - Medium
 *          - High
 *          
 */

// exports for zod validations
const HasId = z.object({
    id: z.number(),
})

export const StoryBaseSchema = z.object({
    projectId: z.number({
        invalid_type_error: "projectId must be a number",
        required_error: "projectId is required"
    }),
    name: z.string({
        required_error: "Story name is required",
    })
        .trim()
        .min(1, "Story name cannot be empty"),
    description: z.string({
        required_error: "Story description is required",
    }),
    priority: priorityConvert(StoryPriority),
    businessValue: bvalConvert(BusinessValue),
    acceptanceCriteria: z.string(),
    status: z.string(),
    sprintId: z.number().or(z.null())
});
//used for story creation
export const StoryCreateSchema = StoryBaseSchema.omit({projectId: true});

const StoryWithId = StoryBaseSchema.merge(HasId);

// used for patch updates, when not every field is required
export const StoryUpdateSchema = StoryCreateSchema.partial();

// type exports for typescript functions
export type StoryCreate = z.infer<typeof StoryCreateSchema>
export type StoryUpdate = z.infer<typeof StoryUpdateSchema>;
export type StoryWithId = z.infer<typeof StoryWithId>;