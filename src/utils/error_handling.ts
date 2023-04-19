import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response, NextFunction } from "express";

export const general_error_handler = (
    err: any,
    res: Response,
    next: NextFunction,
    customMessage?: string
) => {
    if (err instanceof PrismaClientKnownRequestError) {
        prisma_error_handler(err, res, next, customMessage);
    } else {
        next(err);
    }
};

export const prisma_error_handler = (
    err: PrismaClientKnownRequestError,
    res: Response,
    next: NextFunction,
    customMessage?: string
) => {
    if (err.code === "P2002") {
        res.status(409).json({
            status: "failed",
            error: {
                code: err.code,
                path: err.meta?.target,
                message:
                    customMessage ||
                    "Write to DB failed due to unique constraint violation",
            },
        });
    } else if (err.code === "P2025") {
        res.status(409).json({
            status: "failed",
            error: {
                code: err.code,
                message: customMessage || "Item not found",
            },
        });
    } else if (err.code === "P2003") {
        var path = err.meta?.field_name;
        if (typeof(path) == 'string') {
            path = path.split("_")[1];
        }
        return_error(
            customMessage || `Foreign key ${path} does not exist`,
            res,
            next
        );
    } else {
        console.log("unknown error code: ", err.code);
        next(err);
    }
};

export const return_error = (
    message: string,
    res: Response,
    next: NextFunction
) => {
    res.status(409).json({
        status: "failed",
        error: {
            message: message,
        },
    });
    next();
};
