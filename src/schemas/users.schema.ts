import {z} from "zod";


export const UserSchema = z.object({
    name: z.string({
        required_error: "Name is required and it must be at least 3 characters long"
    }).min(3),
    isAdmin: z.boolean({
        required_error: "isAdmin field is required"
    }),
});

export const UserCreateSchema = UserSchema.merge(z.object({
    password: z.string({
        required_error: "Password is requried"
    }).min(8)
}));

export const UserWithIdSchema = UserSchema.merge(z.object({
    id: z.number()
}));






