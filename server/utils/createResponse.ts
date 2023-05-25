import { httpResponseType } from "../types/appTypes";

export function createResponse(body: object, statusCode: number, cookies: object[] = [], headers = {"Content-Type": "application/json"}): httpResponseType {

    return {
        headers,
        statusCode,
        body,
        cookies,
    };
}