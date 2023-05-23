import { JwtPayload } from "jsonwebtoken";
import Session from "../models/session.models";
import User from "../models/user.models";
import { signJwt, verifyJwt } from "../utils/jwt.utils";

export const createSession = async (userId: string, userAgent: string) => {
    const sessions = await Session.create({user: userId, userAgent});
    return sessions.toJSON();
};

export const findSessions = async (query: object) => {
    const sessions = Session.find(query);
    return sessions;
};

interface decodedSession extends JwtPayload {
    session: string,
}

export const reIssueAccessToken = async (refreshToken: string) => {
    // data: session: sessionId, user information (_id and email)
    // from session queried from db, use user id to query user information for decoding
    const {decoded} = verifyJwt(refreshToken);
    if(!decoded || !(decoded as decodedSession).session) return false;

    // check if session if still valid in DB
    const session = await Session.findById((decoded as decodedSession).session);
    if(!session || !session.valid) return false;

    // extract user data for jwt payload
    const user = await User.findById(session.user);

    if(!user) return false;

    const payload = {
        _id: user._id,
        email: user.email,
        session: session._id
    };

    return signJwt(payload, { expiresIn: process.env.ACCESS_TOKEN_TL});
};