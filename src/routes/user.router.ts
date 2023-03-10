import express from "express";
import UserController from "../controller/user.controller";

import { validateId, validateUserCreate, validateUserUpdate } from "../services/validator.service"



export const userRouter = express.Router();

// userRouter.get("/", async (req: Request, res: Response) => {
//     try {
//         const users = await UserService.getAllUsers();
//         return res.status(200).json(users);
//     } catch (error: any) {
//         return res.status(500).json({message: error.message});
//     }
// })

userRouter.route("/")
    .get(UserController.getAll)
    .post(validateUserCreate ,UserController.create);

userRouter.route("/:id").all(validateId)
    .get(UserController.getSingle)
    .patch(validateUserUpdate, UserController.updateSingle)
    .delete(UserController.deleteSingle);
