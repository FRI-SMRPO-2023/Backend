import {Request, Response, NextFunction} from "express";

const lowercaseBodyProp = (prop: string) =>  
    async (req: Request, res: Response, next: NextFunction) => {
        if (req.body[prop]) {
            if (typeof req.body[prop] !== 'string') {
                console.log("property not a string, can't lowercase it")
            } else {
                req.body[prop] = req.body[prop].toLowerCase();
            }
        } else {
            console.log(`Property ${prop} does not exist in the body`)
        }
        next();
    }

export const lowercaseName = lowercaseBodyProp("name");