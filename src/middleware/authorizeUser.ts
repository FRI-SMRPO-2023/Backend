import { Request, Response, NextFunction } from "express"
import { general_error_handler } from "../utils/error_handling"

const USE_AUTH = process.env.USE_AUTH === "true" || process.env.ENV_TYPE === "production";
console.log("USE_AUTH set to", USE_AUTH);

export const authorizer = async (req: Request, res: Response, next: NextFunction) => {
    if (!USE_AUTH) {next(); return}
    if (req.session.authenticated) {
        next();
    } else {
        res.sendStatus(401);
    }
}

export const adminAuthorizer = async (req: Request, res: Response, next: NextFunction) => {
    if (!USE_AUTH) {next(); return;}
    if (req.session.user.isAdmin) {
        next();
    } else {
        res.sendStatus(403);
    }
}

export const adminOrCorrectUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!USE_AUTH) {next(); return;}
    if ((req.session.user.isAdmin) ||
        (req.session.user.id === parseInt(req.params.userId, 10))) {
        next();
    } else {
        res.sendStatus(403);
    }

}

