import { z } from "zod";


export const UserBaseSchema = z.object({
    name: z.string({
        required_error: "Name is required and it must be at least 3 characters long"
    }).min(3),
    isAdmin: z.boolean({
        required_error: "isAdmin field is required"
    }),
});

export const UserCreateSchema = UserBaseSchema.merge(z.object({
    password: z.string({
        required_error: "Password is requried"
    }).min(8)
}));

export const UserWithIdSchema = UserBaseSchema.merge(z.object({
    id: z.number()
}));

//when exporting types, just omit the "Schema" part of the name
export type UserBase = z.infer<typeof UserBaseSchema>;
export type UserWithId = z.infer<typeof UserWithIdSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;






