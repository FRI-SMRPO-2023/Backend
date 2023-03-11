import { z } from "zod";


/**
 * @openapi
 * components:
 *   schemas:
 *      UserCreate:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          password:
 *            type: string
 *          email:
 *            type: string
 *          isAdmin:
 *            type: boolean
 *        example:
 *          name: Slavko
 *          password: badpassword123
 *          email: bademail123@mail.com
 *          isAdmin: false
 *        required:
 *          - name
 *          - password
 *          - email
 *          - isAdmin
 *      UserReturn:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          isAdmin:
 *            type: boolean
 *        example:
 *          id: 2
 *          name: Slavko
 *          email: bademail123@mail.com
 *          isAdmin: false
 *        required:
 *          - id
 *          - name
 *          - email
 *          - isAdmin 
 *      UserLogin:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *        example:
 *          email: bademail123@mail.com
 *          password: correctpassword
 *        required:
 *          - email
 *          - password
 *      PasswordChange:
 *        type: object
 *        properties:
 *          oldPassword:
 *            type: string
 *          newPassword:
 *            type: string
 *        example:
 *          oldPassword: "changemeplease"
 *          newPassword: "butnotlikethis"
 *        required:
 *          - oldPassword
 *          - newPassword  
 */


export const UserBaseSchema = z.object({
    name: z.string({
        required_error: "Name field is required and it must be at least 3 characters long"
    }).min(3),
    email: z.string({
        required_error: "Email field is required and it must be a proper email address"
    }).email(),
    isAdmin: z.boolean({
        required_error: "isAdmin field is required"
    }),
});


export const UserCreateSchema = UserBaseSchema.merge(z.object({
    password: z.string({
        required_error: "Password is requried"
    }).min(12).max(128)
}));

export const UserLoginSchema = UserCreateSchema.omit({isAdmin: true, name: true});

export const UserWithIdSchema = UserBaseSchema.merge(z.object({
    id: z.number()
}));

export const UserPasswordChangeSchema = z.object({
    oldPassword: z.string({
        required_error: "oldPassword field is required"
    }),
    newPassword: z.string({
        required_error: "newPassword field is required"
    }).min(12).max(128)
});

export const UserUpdateSchema = UserCreateSchema.partial();

//when exporting types, just omit the "Schema" part of the name
export type UserBase = z.infer<typeof UserBaseSchema>;
export type UserWithId = z.infer<typeof UserWithIdSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;






