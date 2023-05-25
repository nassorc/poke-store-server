// Gloabl app types file
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

export interface httpResponseType {
    headers: object,
    statusCode: number,
    body: object | string,  
    cookies?: object[],
}
export interface callbackHandlerFn {
    (httpRequest: httpRequestType): {headers: any, statusCode: number, body: any} 
}