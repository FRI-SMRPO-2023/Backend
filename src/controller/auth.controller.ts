import UserService from "../services/user.service";
import { RequestHandler } from "express";
import { general_error_handler } from "../utils/error_handling";

const login: RequestHandler = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await UserService.checkEmailPassword(email, password);
        if (!user) {
            res.status(200).json({
                status: "failed",
                error: {
                    "message": "Incorrect email or password",
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
            res.status(200).json(req.session.user);
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
            res.clearCookie("session", {path: "/"}).sendStatus(200);
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