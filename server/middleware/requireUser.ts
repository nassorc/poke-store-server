import { Request, Response, NextFunction} from "express";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    if(!req?.body?.locals?.user || req?.body?.locals?.user == undefined) {
        return res.sendStatus(403);
    }
    next();
};