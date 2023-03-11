import express from "express";
import UserController from "../controller/user.controller";
import { adminAuthorizer } from "../middleware/authorizeUser";
import { validateId, validateUserCreate, validateUserUpdate } from "../services/validator.service"



const userRouter = express.Router();

userRouter.route("/")
    .get(UserController.getAll)
    .post(adminAuthorizer, validateUserCreate, UserController.create);

userRouter.route("/:id").all(validateId)
    .get(UserController.getSingle)
    .patch(validateUserUpdate, UserController.updateSingle)
    .delete(adminAuthorizer, UserController.deleteSingle);

export default userRouter;
