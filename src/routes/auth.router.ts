import AuthController from "../controller/auth.controller";
import express from "express";


const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/logout", AuthController.logout);
authRouter.get("/is-authenticated", AuthController.isLoggedIn);

export default authRouter;
