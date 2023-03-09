import {z} from 'zod';


// for body validation in post request
export const UsersOnProjectsSchema = z.object({
    userId: z.number(),
    projectId: z.number(),
    userRole: z.enum(["Leader", "Developer"])
});