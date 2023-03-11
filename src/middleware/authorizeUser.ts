import { Request, Response, NextFunction } from "express"
import { general_error_handler } from "../utils/error_handling"

export const authorizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.session.authenticated) {
            next();
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

export const adminAuthorizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.session.user.isAdmin) {
            next();
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

export const adminOrCorrectUser = async (req: Request, res: Response, next: NextFunction) => {
    if ((req.session.user.isAdmin) || 
        (req.session.user.id === parseInt(req.params.id, 10))) {
        next();
    } else {
        res.sendStatus(403);
    }
    
}

