import express from "express";
import UserController from "../controller/user.controller";
import { adminAuthorizer, adminOrCorrectUser } from "../middleware/authorizeUser";
import { validateId, validateUserCreate, validateUserUpdate, validateUserPasswordChange } from "../services/validator.service"



const userRouter = express.Router();

userRouter.route("/")
    .get(UserController.getAll)
    .post(adminAuthorizer, validateUserCreate, UserController.create);

userRouter.route("/:id").all(validateId)
    .get(UserController.getSingle)
    .patch(validateUserUpdate, UserController.updateSingle)
    .delete(adminAuthorizer, UserController.deleteSingle);

userRouter.patch("/:id/password-change", validateId,
                                        adminOrCorrectUser,
                                        validateUserPasswordChange, 
                                        UserController.changePassword);

export default userRouter;
