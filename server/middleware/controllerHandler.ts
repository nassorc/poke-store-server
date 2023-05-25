import { Request, Response } from "express";
import { httpRequestType, httpResponseType } from "../types/appTypes";

export const controllerHandler = (handler: (httpRequest: httpRequestType) => Promise<httpResponseType>) => async (req: Request, res: Response) => {
    const requestObject: httpRequestType = {
        body: req.body,
        params: req.params,
        headers: req.headers,
    };
    // console.log(req.body);
    try {
        const responseObject = await handler(requestObject);
        if(responseObject.headers) {
            res.set(responseObject.headers);
        }
        if(responseObject.cookies) {
            responseObject.cookies.forEach(cookie => {
                console.log("Cookie");
                console.log(Object.keys(cookie)[0]);
                console.log(Object.values(cookie)[0]);
                res.cookie(Object.keys(cookie)[0], Object.values(cookie)[0], { httpOnly: true });
            });
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