import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateIdParam =  (idName: string) => 
    async (req: Request, res: Response, next: NextFunction) => {
        if (isNaN(Number(req.params[idName]))) {
            res.status(400).json({ 
                status: "failed",
                error: {
                    message: `${idName} must be an integer`
                } 
            });
        } else {
            next();
        }
    }


export const validate =
    (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync(req.body);
                next();
            } catch (error: any) {
                let err = error;
                if (err instanceof z.ZodError) {
                    err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
                }
                return res.status(409).json({
                    status: 'failed',
                    error: err[0],
                });
            }
        };
