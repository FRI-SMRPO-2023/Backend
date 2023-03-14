import { z } from "zod";


/**
 * @openapi
 * components:
 *   schemas:
 *      UserCreate:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *          name:
 *            type: string
 *          lastName:
 *            type: string
 *          password:
 *            type: string
 *          email:
 *            type: string
 *          isAdmin:
 *            type: boolean
 *        example:
 *          username: 'admin'
 *          name: Slavko
 *          lastName: 'Premrl'
 *          password: badpassword123
 *          email: bademail123@mail.com
 *          isAdmin: false
 *        required:
 *          - username
 *          - name
 *          - lastName
 *          - password
 *          - email
 *          - isAdmin
 *      UserReturn:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          username:
 *            type: string
 *          name:
 *            type: string
 *          lastName:
 *            type: string
 *          email:
 *            type: string
 *          isAdmin:
 *            type: boolean
 *        example:
 *          id: 2
 *          username: 'admin'
 *          name: Slavko
 *          lastName: 'Premrl'
 *          email: bademail123@mail.com
 *          isAdmin: false
 *        required:
 *          - id
 *          - username
 *          - name
 *          - lastName
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
    username: z.string({
        required_error: "'username' is required and it can't be empty"
    }).min(1),
    name: z.string({
        required_error: "'name' is required and it can't be empty"
    }).min(1),
    lastName: z.string({
        required_error: "lastName is required and it can't be empty"
    }).min(3),
    email: z.string({
        required_error: "Email field is required and it must be a proper email address"
    }).email(),
    isAdmin: z.boolean({
        required_error: "isAdmin field is required"
    }),
    lastLogin: z.date().or(z.null()).optional()
});


export const UserCreateSchema = UserBaseSchema.merge(z.object({
    password: z.string({
        required_error: "Password is requried"
    }).min(12).max(128)
}));

export const UserLoginSchema = UserCreateSchema.pick({email: true, password: true});

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






