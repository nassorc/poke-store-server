import { httpResponseType } from "../types/appTypes";
export function createResponse(body: object, statusCode: number, headers = {"Content-Type": "application/json"}): httpResponseType {
    return {
        headers,
        statusCode,
        body,
    };
}