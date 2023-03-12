import AuthController from "../controller/auth.controller";
import express from "express";
import { validateUserLogin } from "../services/validator.service";


const authRouter = express.Router();

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Authentication api
 *  
 * /api/auth/login:
 *   post:
 *     summary: Login a user into the system, create a httpOnly cookie in browser
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successfull. Return the User OR password is wrong and error message is returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReturn'
 *       500:
 *         description: Some server error
 *              
 */
authRouter.post("/login", validateUserLogin, AuthController.login);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     summary: Logout user from the system, delete the httpOnly cookie in browser
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successfull. Return OK. If user not logged in, also return this code, as the final state in the backend is the same.
 *       500:
 *         description: Some server error             
 */
authRouter.post("/logout", AuthController.logout);

/**
 * @openapi
 * /api/auth/is-authenticated:
 *   get:
 *     summary: Check if the current user is authenticated (has a valid cookie)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User is authenticated. Return OK
 *       409:
 *         description: User not logged in. Return Unauthorized            
 */
authRouter.get("/is-authenticated", AuthController.isLoggedIn);

export default authRouter;
