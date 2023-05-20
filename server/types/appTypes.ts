// Gloabl app types file
export interface httpRequestType {
    body?: {
        [key: string]: string | number | object 
    },
    params?: {
        [key: string]: string | number | object 
    },
}

export interface callbackHandlerFn {
    (httpRequest: httpRequestType): {headers: object, statusCode: number, body: JSON} 
}