import express from "express";
import UserController from "../controller/user.controller";
import { adminAuthorizer, adminOrCorrectUser } from "../middleware/authorizeUser";
import { validateUserId, validateUserCreate, validateUserUpdate, validateUserPasswordChange } from "../services/validator.service"



const userRouter = express.Router();

userRouter.route("/")
    .get(UserController.getAll)
    .post(adminAuthorizer, validateUserCreate, UserController.create);

userRouter.route("/:userId").all(validateUserId)
    .get(UserController.getSingle)
    .patch(adminAuthorizer, validateUserUpdate, UserController.updateSingle)
    .delete(adminAuthorizer, UserController.deleteSingle);

userRouter.patch("/:userId/password-change", validateUserId,
                                        adminOrCorrectUser,
                                        validateUserPasswordChange, 
                                        UserController.changePassword);

export default userRouter;
