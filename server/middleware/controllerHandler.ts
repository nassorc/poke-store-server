import { Request, Response, NextFunction } from "express";
import { callbackHandlerFn } from "../types/appTypes";

export const controllerHandler = (handler: callbackHandlerFn) => async (req: Request, res: Response, next: NextFunction) => {
    const requestObject = {
        body: req.body,
        params: req.params,
    };
    try {
        const responseObject = await handler(requestObject);
        if(responseObject.headers) {
            res.set(responseObject.headers);
        }
        res.type("json");
        res.status(responseObject.statusCode).send(responseObject.body);
    }
    catch(error: any) {
        console.log(error.message);
        res.sendStatus(500);
    }
    handler(requestObject);
};