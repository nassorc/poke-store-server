import { Request, Response, NextFunction } from "express";
import Joi, {Schema} from "joi";

export const validateResource = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        Joi.assert({body: req.body}, schema);
        next();
    }
    catch(error: any) {
        return res.status(400).send(error.message);
    }
}; 

