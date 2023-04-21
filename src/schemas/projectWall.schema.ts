import { z } from "zod";
import { UserReturnSchema } from "./users.schema";


/**
 * @openapi
 * components:
 *   schemas:
 *      ProjectWallCreate:
 *        type: object
 *        properties:
 *          userId:
 *            type: number
 *          title:
 *            type: string
 *          content:
 *            type: string
 *        example:
 *          userId: 1
 *          title: My first project wall post
 *          content: This is my first post on the project wall!
 *        required:
 *          - userId
 *          - title
 *          - content
 *      ProjectWallReturn:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          userId:
 *            type: number
 *          projectId:
 *            type: number
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *          title:
 *            type: string
 *          content:
 *            type: string
 *          edited:
 *            type: boolean
 *          user:
 *            $ref: '#/components/schemas/UserReturn'
 *        example:
 *          id: 1
 *          userId: 1
 *          projectId: 1
 *          createdAt: "2023-04-21T12:00:00.000Z"
 *          updatedAt: "2023-04-21T12:01:00.000Z"
 *          title: My first project wall post
 *          content: This is my first post on the project wall!
 *          edited: true
 *          user: {id: 1, name: "John Doe"}
 *        required:
 *          - id
 *          - userId
 *          - projectId
 *          - createdAt
 *          - title
 *          - content
 *          - edited
 *          - user
 *      ProjectWallUpdate:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          content:
 *            type: string
 *          edited:
 *            type: boolean
 *        example:
 *          title: My edited post
 *          content: This is the edited content of my post
 *          edited: true
 *        required:
 *          - title
 *          - content
 *          - edited
 */

export const ProjectWallBaseSchema = z.object({
  userId: z.number(),
  projectId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().or(z.null()),
  title: z.string(),
  content: z.string(),
  edited: z.boolean(),
});

export const ProjectWallCreateSchema = ProjectWallBaseSchema.omit({
  projectId: true,
  createdAt: true,
  updatedAt: true,
  edited: true,
});

export const ProjectWallReturnSchema = ProjectWallBaseSchema.extend({
  id: z.number(),
  user: UserReturnSchema,
});

export const ProjectWallUpdateSchema = ProjectWallCreateSchema.omit({
  userId: true,
}).partial();

export type ProjectWallCreate = z.infer<typeof ProjectWallCreateSchema>;
export type ProjectWallReturn = z.infer<typeof ProjectWallReturnSchema>;
export type ProjectWallUpdate = z.infer<typeof ProjectWallUpdateSchema>;
