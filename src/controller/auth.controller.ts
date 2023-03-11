import UserService from "../services/user.service";
import { RequestHandler } from "express";
import { general_error_handler } from "../utils/error_handling";

const login: RequestHandler = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await UserService.checkUsernamePassword(username, password);
        if (!user) {
            res.status(200).json({
                status: "failed",
                error: {
                    "message": "Incorrect username or password",
                }
            })
        } else {
            req.session.user = user;
            req.session.authenticated = true;
            res.status(200).json(user);
        }
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const isLoggedIn: RequestHandler = async (req, res, next) => {
    try {
        if (req.session.authenticated) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const logout: RequestHandler = async (req, res, next) => {
    try {
        if (req.session) {
            req.session.destroy(() => {
            });
            res.sendStatus(200).clearCookie("session", {path: "/"});
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const AuthController = {
    login,
    logout,
    isLoggedIn
}

export default AuthController;