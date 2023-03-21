import { z } from 'zod';
import { priorityConvert } from '../utils/priority_conversion';
import { StoryPriority } from '@prisma/client';

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
 *            type: number
 *            description: ranges from 1 - 10
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
 *          businessValue: 4
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
 *            type: number
 *          acceptanceCriteria:
 *              type: string
 *          status:
 *              type: string
 *          timeComplexity:
 *              type: number
 *          sprintId:
 *              type: [number, 'null']
 *        example:
 *          id: 1
 *          projectId: 1
 *          name: Frogify
 *          description: Story about musical frogs
 *          priority: MustHave
 *          businessValue: 5
 *          acceptanceCriteria: this must work, this must not be allowd
 *          status: SprintBacklog
 *          timeComplexity: 3
 *          sprintId: 1
 *        required:
 *          - projectId
 *          - name
 *          - description
 *          - priority
 *          - businessValue
 *          - acceptanceCriteria
 *          - status
 *          - timeComplexity
 *          - sprintId
 *      StoryPriority:
 *        type: string
 *        enum:
 *          - CouldHave
 *          - ShouldHave
 *          - MustHave
 *          - WontHaveThisTime
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
    businessValue: z.number().min(1).max(10),
    acceptanceCriteria: z.string(),
    status: z.string(),
    sprintId: z.number().or(z.null())
});
//used for story creation
export const StoryCreateSchema = StoryBaseSchema.omit({projectId: true});

const StoryWithId = StoryBaseSchema.merge(HasId).extend(
    {timeComplexity: z.number().min(0).or(z.null())});

// used for patch updates, when not every field is required
export const StoryUpdateSchema = StoryCreateSchema.extend({timeComplexity: z.number().min(0)}).partial();

// type exports for typescript functions
export type StoryCreate = z.infer<typeof StoryCreateSchema>
export type StoryUpdate = z.infer<typeof StoryUpdateSchema>;
export type StoryWithId = z.infer<typeof StoryWithId>;