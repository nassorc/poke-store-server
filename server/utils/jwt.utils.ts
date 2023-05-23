import jwt from "jsonwebtoken";

export const signJwt = (payload: object, options?: object | undefined) => {
    return jwt.sign(payload, process.env.SECRET_KEY as string, (options && options));
};

export const verifyJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        return {
            valid: true,
            expired: false,
            decoded
        };
    }
    catch(error: any) {
        console.log(error.message);
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
};