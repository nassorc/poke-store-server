import { httpRequestType } from "../types/appTypes";
import { validatePassword } from "../services/user.service";
import { createResponse } from "../utils/createResponse";
import { createSession, findSessions } from "../services/session.service";
import jwt from "jsonwebtoken";
import { create } from "domain";

export async function createUserSessionHandler(httpRequest: httpRequestType) {
    try {
        // validate password
        const user = await validatePassword(httpRequest.body);
        if(!user) return createResponse({message: "Invalid email or password"}, 401);

        // create session
        const session = await createSession( user._id.toString() , httpRequest.headers["user-agent"] || "");
        // create access and refresh token
        const accessToken = jwt.sign({ ...user, session: session._id }, `${ process.env.SECRET_KEY }`, { expiresIn: process.env.ACCESS_TOKEN_TL});
        const refreshToken = jwt.sign({ ...user, session: session._id },  `${ process.env.SECRET_KEY }`, { expiresIn: process.env.REFRESH_TOKEN_TL });

        return createResponse({accessToken, refreshToken}, 200);
    }
    catch(error: any) {
        console.log(error.message);
        return createResponse({message: error.message}, 400);
    }
}

export async function getUserSessionHandler(httpRequest: httpRequestType) {
    // find session and return all session given a user id
    try {
        const sessions = await findSessions({user: httpRequest.body.locals.user._id});
        console.log(sessions);
        return createResponse({ sessions }, 200);
    }
    catch(error: any) {
        console.log(error.message);
        return createResponse({message: error.message}, 500);
    }

}