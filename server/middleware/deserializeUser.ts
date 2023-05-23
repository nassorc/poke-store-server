import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { reIssueAccessToken } from "../services/session.service";
import { verify } from "crypto";
import { verifyJwt } from "../utils/jwt.utils";
export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const refreshToken: string = (new String(req.headers?.["x-refresh"])).toString();

    if(!accessToken || !refreshToken) return next();

    interface tokenState {
        valid: boolean,
        expired: boolean,
        decoded: any,
    }
    let sessionState: tokenState; 
    
    try {
        const decoded = jwt.verify(accessToken, `${process.env.SECRET_KEY}`);
        sessionState = {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch(error: any) {
        console.log(error.message);
        sessionState = {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
    // if valid, save to local 
    if(sessionState.valid) {
        req.body = {...req.body, locals: { user: sessionState.decoded }}; 
        return next();
    }

    // check if access token is expired
    if(sessionState.expired && refreshToken) {
        // if expired, validate refresh token
        // issue new access token and add to response header
        const newAccessToken = await reIssueAccessToken(refreshToken);
        if(newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
            // decode token and set in body
            const {decoded} = verifyJwt(newAccessToken);
            req.body = {...req.body, locals: { user: decoded }}; 
        }
        return next();
    }

    // if expired, check refresh token

    // decode refresh token

    // re issue access token or next
    // add new access token on headers response object

    return next();
};