import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate =
    (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parseAsync(req.body).then( (resp) =>
                    {console.log("parse successfull");}
                ).catch(
                    (err) => {
                        console.log("===================================");
                    }
                );
                next();
            } catch (error: any) {
                let err = error;
                if (err instanceof z.ZodError) {
                    err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
                }
                return res.status(409).json({
                    status: 'failed',
                    error: err,
                });
            }
        };

export default validate;