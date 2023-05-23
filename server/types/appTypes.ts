import { Request } from "express";
// Gloabl app types file
interface extendedBody extends Request {
    [key: string]: any,
    locals?: {
        user?: object
    }
}
export interface httpRequestType {
    body: any,
    params?: object | string | number,
    headers: {
        "user-agent"?: string,
    },
    locals?: {
        user?: object
    } 
}

export interface callbackHandlerFn {
    (httpRequest: httpRequestType): {headers: any, statusCode: number, body: any} 
}
export interface httpResponseType {
    headers: object,
    statusCode: number,
    body: object | string,  
}