import express from "express";
import UserController from "../controller/user.controller";
import {
    adminAuthorizer,
    adminOrCorrectUser,
} from "../middleware/authorizeUser";
import {
    validateUserId,
    validateUserCreate,
    validateUserUpdate,
    validateUserPasswordChange,
} from "../services/validator.service";

const userRouter = express.Router();

/**
 * @openapi
 * tags:
 *   name: User
 *   description: User management api
 *
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/UserReturn'
 *         description: Return all a list of all users
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User created. Return the created User, but without password (obviously).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReturn'
 *       409:
 *         description: User with specified email already exists.
 *       500:
 *         description: Some server error
 *
 */

userRouter
    .route("/")
    .get(UserController.getAll)
    .post(adminAuthorizer, validateUserCreate, UserController.create);

/**
 * @openapi
 * /api/users/{id}:
 *  patch:
 *      summary: Update any (or multiple) fields in the user with specified id
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserCreate'
 *      responses:
 *          200:
 *              description: Update successful
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/UserCreate'
 *          409:
 *              description: User with specified id does not exist or email already exists (when updating mail)
 *
 *  delete:
 *      summary: Delete user by id
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *      responses:
 *          204:
 *              description: Delete successful
 *          409:
 *              description: User with specified id does not exist
 *
 *  get:
 *    summary: Get user by id
 *    tags: [User]
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *    responses:
 *      200:
 *         description: Single object returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/UserReturn'
 *      409:
 *          description: User with specified id does not exist
 */
userRouter
    .route("/:userId")
    .all(validateUserId)
    .get(UserController.getSingle)
    .patch(adminOrCorrectUser, validateUserUpdate, UserController.updateSingle)
    .delete(adminAuthorizer, UserController.deleteSingle);

/**
 * @openapi
 * /api/users/{id}/password-change:
 *  patch:
 *      summary: Update any (or multiple) fields in the project
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PasswordChange'
 *      responses:
 *          200:
 *              description: Update successfull
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/UserReturn'
 *          409:
 *              description: Invalid old password or new password not valid (too short)
 */

userRouter.patch(
    "/:userId/password-change",
    validateUserId,
    adminOrCorrectUser,
    validateUserPasswordChange,
    UserController.changePassword
);

export default userRouter;
