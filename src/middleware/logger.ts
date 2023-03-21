import {RequestHandler} from "express";

export const logRequest: RequestHandler = async (req, res, next) => {
    console.log("REQUEST")
    console.log("url: ", req.url);
    console.log("method: ", req.method);
    console.log("body: ", req.body);
    console.log("params: ", req.params);
    console.log();
    next();
}