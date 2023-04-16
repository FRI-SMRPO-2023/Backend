import {Request, Response, NextFunction} from "express";
import { trim } from "../utils/parsing";

const lowercaseBodyProp = (prop: string) =>  
    async (req: Request, res: Response, next: NextFunction) => {
        if (req.body[prop]) {
            if (typeof req.body[prop] !== 'string') {
                console.log("property not a string, can't lowercase it")
            } else {
                req.body[prop] = trim(req.body[prop].toLowerCase(), " ");
            }
        } else {
            console.log(`"lowercaseBodyProp": Property ${prop} does not exist in the body`)
        }
        next();
    }

export const lowercaseName = lowercaseBodyProp("name");
export const lowercaseDescription = lowercaseBodyProp("description");
