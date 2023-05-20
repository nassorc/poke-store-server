import { Request, Response, NextFunction } from "express";
import Joi, {Schema} from "joi";

export const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        Joi.assert(req.body, schema);
    }
    catch(error: any) {
        return res.status(400).send(error.message);
    }
}; 

